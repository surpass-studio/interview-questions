import { Tooltip, ActionIcon } from '@mantine/core'
import { IconRefresh } from '@tabler/icons-react'
import { type UIMessage } from 'ai'
import useSharedChat from '../useSharedChat'

interface RegenerateMessageButtonProps {
	message: UIMessage
}

const RegenerateMessageButton = ({ message }: RegenerateMessageButtonProps) => {
	const { messages, setMessages } = useSharedChat()

	const regenerate = () => {
		const messageIndex = messages.findIndex(
			(_message) => _message.id === message.id,
		)

		if (messageIndex <= 0 || message.role !== 'assistant') {
			return
		}

		setMessages((messages) => messages.slice(0, messageIndex))
	}

	return (
		<Tooltip label="Regenerate">
			<ActionIcon color="gray" variant="subtle" onClick={regenerate}>
				<IconRefresh className="size-5" />
			</ActionIcon>
		</Tooltip>
	)
}

export default RegenerateMessageButton
