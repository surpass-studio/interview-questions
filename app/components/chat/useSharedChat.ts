import { type Message, useChat } from '@ai-sdk/react'
import { useLoaderData, useParams } from 'react-router'
import { type Info } from '../../routes/chat.$conversationId/+types'
import useChatReasoningToggle from './useChatReasoningToggle'

const useSharedChat = () => {
	const { conversationId } = useParams<Info['params']>()

	const { isReasoningEnabled } = useChatReasoningToggle(false)

	const { conversation } = useLoaderData<Info['loaderData']>()

	const chat = useChat({
		id: conversationId,
		body: {
			sendReasoning: isReasoningEnabled,
		},
		initialMessages: conversation.messages as Message[],
		sendExtraMessageFields: true,
	})

	return chat
}

export default useSharedChat
