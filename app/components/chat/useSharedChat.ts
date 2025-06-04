import { type Message, useChat } from '@ai-sdk/react'
import { useLoaderData, useParams } from 'react-router'
import { type Route } from '../../routes/chat.$conversationId/+types/route'

const useSharedChat = () => {
	const { conversationId } = useParams<Route.ComponentProps['params']>()

	const { conversation } = useLoaderData<Route.ComponentProps['loaderData']>()

	const chat = useChat({
		id: conversationId,
		initialMessages: conversation.messages as Message[],
		sendExtraMessageFields: true,
	})

	return chat
}

export default useSharedChat
