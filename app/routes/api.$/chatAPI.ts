import { createOpenAICompatible } from '@ai-sdk/openai-compatible'
import { sValidator } from '@hono/standard-validator'
import {
	type Message,
	appendResponseMessages,
	generateId,
	smoothStream,
	streamText,
} from 'ai'
import { and, eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { href, redirect } from 'react-router'
import * as v from 'valibot'
import { type Bindings } from './'
import inputValidationSchema from '@/components/chat/inputValidationSchema'
import * as schema from '@/db/schema'

interface ChatAPIRequestBody {
	id: string
	messages: Message[]
	sendReasoning: boolean
}

const chatAPI = new Hono<{ Bindings: Bindings }>()
	.post('/', async (c) => {
		const {
			id,
			messages,
			sendReasoning = true,
		} = await c.req.json<ChatAPIRequestBody>()

		const model = createOpenAICompatible({
			name: 'SiliconFlow',
			baseURL: 'https://api.siliconflow.cn/v1',
			apiKey: c.env.cloudflare.env.SILICON_CLOUD_API_KEY,
		}).chatModel('deepseek-ai/DeepSeek-R1-Distill-Qwen-7B')

		const result = streamText({
			model,
			messages,
			experimental_transform: smoothStream(),
			onFinish: async ({ response }) => {
				const finalMessages = appendResponseMessages({
					messages,
					responseMessages: response.messages,
				})

				await c.env.db
					.update(schema.chatConversations)
					.set({
						messages: finalMessages,
					})
					.where(
						and(
							eq(schema.chatConversations.id, id),
							eq(schema.chatConversations.user_id, c.env.auth.userId as string),
						),
					)
			},
		})

		return result.toDataStreamResponse({ sendReasoning })
	})
	.post(
		'/create',
		sValidator('form', v.object({ content: inputValidationSchema })),
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
							content,
							createdAt: new Date(),
						},
					],
				})
				.returning()

			const conversation =
				insertedConversation[0] as (typeof insertedConversation)[number]

			return redirect(
				href('/chat/:conversationId', { conversationId: conversation.id }),
			)
		},
	)
	.delete(
		'/:conversationId',
		sValidator(
			'param',
			v.object({
				conversationId: v.pipe(v.string(), v.trim(), v.minLength(1)),
			}),
		),
		sValidator(
			'form',
			v.object({
				redirect: v.union([v.literal('true'), v.literal('false')]),
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
				? redirect(href('/chat'))
				: c.json({ success: true })
		},
	)

export default chatAPI
