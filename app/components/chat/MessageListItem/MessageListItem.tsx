import { type UIMessage } from 'ai'
import AssistantMessage from './AssistantMessage'
import UserMessage from './UserMessage'

interface MessageListItemProps {
	message: UIMessage
}

const MessageListItem = ({ message }: MessageListItemProps) => {
	if (message.role === 'user') {
		return <UserMessage message={message} />
	} else if (message.role === 'assistant') {
		return <AssistantMessage message={message} />
	}

	return null
}

export default MessageListItem
