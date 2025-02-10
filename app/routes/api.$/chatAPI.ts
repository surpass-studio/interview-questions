import { createOpenAI } from '@ai-sdk/openai'
import { type Message, streamText } from 'ai'
import { Hono } from 'hono'
import { type Bindings } from './'

const openai = createOpenAI({
	apiKey: process.env.SILICON_CLOUD_API_KEY,
	baseURL: 'https://api.siliconflow.cn/v1',
})

const chatAPI = new Hono<{ Bindings: Bindings }>().post('/', async (c) => {
	const { messages } = await c.req.json<{ messages: Message[] }>()

	const result = streamText({
		model: openai('deepseek-ai/DeepSeek-R1-Distill-Qwen-7B'),
		messages,
	})

	return result.toTextStreamResponse({
		headers: {
			'Content-Type': 'text/x-unknown',
			'content-encoding': 'identity',
			'transfer-encoding': 'chunked',
		},
	})
})

export default chatAPI
