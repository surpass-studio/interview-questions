import { createOpenAICompatible } from '@ai-sdk/openai-compatible'
import { type LanguageModelV1, type Message, streamText } from 'ai'
import { Hono } from 'hono'
import { type Bindings } from './'

let model: LanguageModelV1 | null = null

const chatAPI = new Hono<{ Bindings: Bindings }>().post('/', async (c) => {
	const { messages } = await c.req.json<{ messages: Message[] }>()

	if (model === null) {
		model = createOpenAICompatible({
			name: 'SiliconFlow',
			baseURL: 'https://api.siliconflow.cn/v1',
			apiKey: c.env.SILICON_CLOUD_API_KEY,
		}).chatModel('deepseek-ai/DeepSeek-R1-Distill-Qwen-7B')
	}

	const result = streamText({
		model,
		messages,
	})

	return result.toDataStreamResponse({ sendReasoning: true })
})

export default chatAPI
