import { type OpenAIProvider, createOpenAI } from '@ai-sdk/openai'
import { type Message, streamText } from 'ai'
import { Hono } from 'hono'
import { type Bindings } from './'

let openai: OpenAIProvider | null = null

const chatAPI = new Hono<{ Bindings: Bindings }>().post('/', async (c) => {
	const { messages } = await c.req.json<{ messages: Message[] }>()

	if (openai === null) {
		openai = createOpenAI({
			apiKey: c.env.SILICON_CLOUD_API_KEY,
			baseURL: 'https://api.siliconflow.cn/v1',
		})
	}

	const result = streamText({
		model: openai('deepseek-ai/DeepSeek-R1-Distill-Qwen-7B'),
		messages,
	})

	return result.toDataStreamResponse()
})

export default chatAPI
