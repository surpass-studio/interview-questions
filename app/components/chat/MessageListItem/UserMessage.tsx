import { Paper, Text } from '@mantine/core'
import { type UIMessage } from 'ai'
import clsx from 'clsx'
import classes from './MessageListItem.module.css'

interface UserMessageProps {
	message: UIMessage
}

const UserMessage = ({ message }: UserMessageProps) => {
	return (
		<Paper
			key={message.id}
			className={clsx(
				'max-w-5/6 self-end wrap-break-word',
				classes.userListItemContent,
			)}
			p="sm"
		>
			{message.parts.map((part) =>
				part.type === 'text' ? <Text key={part.type}>{part.text}</Text> : null,
			)}
		</Paper>
	)
}

export default UserMessage
