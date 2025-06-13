import { Group, Paper, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { type UIMessage } from 'ai'
import EditMessageButton from './EditMessageButton'
import EditMessageForm from './EditMessageForm'
import classes from './MessageListItem.module.css'

interface UserMessageProps {
	message: UIMessage
}

const UserMessage = ({ message }: UserMessageProps) => {
	const [isEditing, { toggle }] = useDisclosure(false)

	const textPart = message.parts.find((part) => part.type === 'text')

	if (!textPart) {
		throw new Error('No text part found in message')
	}

	if (isEditing) {
		return (
			<EditMessageForm
				text={textPart.text}
				message={message}
				onCancel={toggle}
			/>
		)
	}

	return (
		<Group
			className="group max-w-5/6 self-end wrap-break-word"
			gap="xs"
			justify="end"
			align="start"
		>
			<Group
				className="opacity-0 transition-opacity group-hover:opacity-100"
				pt="sm"
				gap="xs"
			>
				<EditMessageButton onEdit={toggle} />
			</Group>
			<Paper
				key={message.id}
				className={classes.userListItemContent}
				px="md"
				py="sm"
				radius="lg"
			>
				<Text className="whitespace-pre-wrap">{textPart.text}</Text>
			</Paper>
		</Group>
	)
}

export default UserMessage
