import { createOpenAICompatible } from '@ai-sdk/openai-compatible'
import { sValidator } from '@hono/standard-validator'
import {
	type UIMessage,
	convertToModelMessages,
	generateId,
	smoothStream,
	streamText,
} from 'ai'
import { and, eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { href } from 'react-router'
import { z } from 'zod/v4'
import { type Bindings } from './route'
import chatSchema from '@/components/chat/chatSchema'
import * as schema from '@/db/schema'

interface ChatAPIRequestBody {
	id: string
	messages: UIMessage[]
}

const chatAPI = new Hono<{ Bindings: Bindings }>()
	.post('/', async (c) => {
		const { id, messages } = await c.req.json<ChatAPIRequestBody>()

		const model = createOpenAICompatible({
			name: 'SiliconFlow',
			baseURL: 'https://api.siliconflow.cn/v1',
			apiKey: c.env.cloudflare.env.SILICON_CLOUD_API_KEY,
		}).chatModel('deepseek-ai/DeepSeek-R1-0528-Qwen3-8B')

		const result = streamText({
			model,
			messages: convertToModelMessages(messages),
			experimental_transform: smoothStream({
				chunking: /[\u4E00-\u9FFF]|\S+\s+/,
			}),
		})

		return result.toUIMessageStreamResponse({
			originalMessages: messages,
			onFinish: async ({ messages }) => {
				await c.env.db
					.update(schema.chatConversations)
					.set({
						messages,
					})
					.where(
						and(
							eq(schema.chatConversations.id, id),
							eq(schema.chatConversations.user_id, c.env.auth.userId as string),
						),
					)
			},
			onError: (error) =>
				error instanceof Error ? error.message : String(error),
		})
	})
	.post(
		'/create',
		sValidator('form', z.object({ content: chatSchema.input })),
		async (c) => {
			const { content } = c.req.valid('form')

			const userId = c.env.auth.userId as string

			const insertedConversation = await c.env.db
				.insert(schema.chatConversations)
				.values({
					user_id: userId,
					title: content.slice(0, 52),
					messages: [
						{
							id: generateId(),
							role: 'user',
							parts: [
								{
									type: 'text',
									text: content,
								},
							],
						},
					],
				})
				.returning()

			const conversation =
				insertedConversation[0] as (typeof insertedConversation)[number]

			return c.redirect(
				href('/chat/:conversationId', { conversationId: conversation.id }),
			)
		},
	)
	.delete(
		'/:conversationId',
		sValidator(
			'param',
			z.object({
				conversationId: z.string().trim().nonempty(),
			}),
		),
		sValidator(
			'form',
			z.object({
				redirect: z.union([z.literal('true'), z.literal('false')]),
			}),
		),
		async (c) => {
			const { conversationId } = c.req.valid('param')

			const shouldRedirect = c.req.valid('form').redirect === 'true'

			await c.env.db
				.delete(schema.chatConversations)
				.where(
					and(
						eq(schema.chatConversations.id, conversationId),
						eq(schema.chatConversations.user_id, c.env.auth.userId as string),
					),
				)

			return shouldRedirect
				? c.redirect(href('/chat'))
				: c.json({ success: true })
		},
	)

export default chatAPI
