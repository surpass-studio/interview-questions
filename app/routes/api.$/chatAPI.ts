import { createOpenAICompatible } from '@ai-sdk/openai-compatible'
import { appendResponseMessages, type Message, streamText } from 'ai'
import { and, eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { type Bindings } from './'
import * as schema from '@/db/schema'

interface ChatAPIRequestBody {
	id: string
	messages: Message[]
	sendReasoning: boolean
}

const chatAPI = new Hono<{ Bindings: Bindings }>().post('/', async (c) => {
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
		onFinish: async ({ response }) => {
			const finalMessages = appendResponseMessages({
				messages,
				responseMessages: response.messages,
			})

			const firstUserMessage = finalMessages.find(
				(message) => message.role === 'user',
			) as Message

			await c.env.db
				.update(schema.chatConversations)
				.set({
					title: firstUserMessage.content.slice(0, 20),
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

export default chatAPI
