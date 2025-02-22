import { useChat } from '@ai-sdk/react'
import { Stack } from '@mantine/core'
import MessageListItem from './MessageListItem'
import useChatAutoScroll from './useChatAutoScroll'
import useConversationId from './useConversationId'

const MessageList = () => {
	const { conversationId } = useConversationId()

	const { status, messages } = useChat({ id: conversationId })

	const lastMessage = messages[messages.length - 1]

	const isPending =
		(status === 'submitted' || status === 'streaming') &&
		lastMessage &&
		lastMessage.role === 'user'

	useChatAutoScroll()

	return (
		<Stack component="ul" className="flex-1" gap="xl">
			{messages.map((message) => (
				<MessageListItem key={message.id} message={message} />
			))}

			{isPending && <MessageListItem.Pending />}
		</Stack>
	)
}

export default MessageList
