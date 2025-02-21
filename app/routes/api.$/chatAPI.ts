import { createOpenAICompatible } from '@ai-sdk/openai-compatible'
import {
	appendResponseMessages,
	type LanguageModelV1,
	type Message,
	streamText,
} from 'ai'
import { Hono } from 'hono'
import { type Bindings } from './'
import * as schema from '@/db/schema'

let model: LanguageModelV1 | null = null

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

	if (model === null) {
		model = createOpenAICompatible({
			name: 'SiliconFlow',
			baseURL: 'https://api.siliconflow.cn/v1',
			apiKey: c.env.cloudflare.env.SILICON_CLOUD_API_KEY,
		}).chatModel('deepseek-ai/DeepSeek-R1-Distill-Qwen-7B')
	}

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
				.insert(schema.chatConversations)
				.values({
					id,
					user_id: c.env.auth.userId as string,
					title: firstUserMessage.content.slice(0, 20),
					messages: finalMessages,
				})
				.onConflictDoUpdate({
					target: schema.chatConversations.id,
					set: { messages: finalMessages },
				})
		},
	})

	return result.toDataStreamResponse({ sendReasoning })
})

export default chatAPI
