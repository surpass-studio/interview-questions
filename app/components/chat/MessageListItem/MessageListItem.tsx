import { Group, Loader, Alert, Text } from '@mantine/core'
import { IconAlertTriangle } from '@tabler/icons-react'
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

MessageListItem.Pending = () => (
	<Group component="li">
		<Loader type="dots" />
	</Group>
)

interface MessageListItemErrorProps {
	error: Error
}

MessageListItem.Error = ({ error }: MessageListItemErrorProps) => (
	<Alert color="red" icon={<IconAlertTriangle />}>
		<Text c="red">{error.message}</Text>
	</Alert>
)

export default MessageListItem
