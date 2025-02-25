import { createOpenAICompatible } from '@ai-sdk/openai-compatible'
import {
	type Message,
	appendResponseMessages,
	smoothStream,
	streamText,
} from 'ai'
import { and, eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { redirect } from 'react-router'
import { type Bindings } from './'
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
	.delete('/:conversationId', async (c) => {
		const conversationId = c.req.param('conversationId')

		await c.env.db
			.delete(schema.chatConversations)
			.where(
				and(
					eq(schema.chatConversations.id, conversationId),
					eq(schema.chatConversations.user_id, c.env.auth.userId as string),
				),
			)

		return redirect('/chat')
	})

export default chatAPI
