import { Tooltip, ActionIcon } from '@mantine/core'
import { IconRefresh } from '@tabler/icons-react'
import { type UIMessage } from 'ai'
import useSharedChat from './useSharedChat'

interface RegenerateMessageButtonProps {
	message: UIMessage
}

const RegenerateMessageButton = ({ message }: RegenerateMessageButtonProps) => {
	const { messages, setMessages, reload } = useSharedChat()

	const regenerate = async () => {
		const messageIndex = messages.findIndex(
			(_message) => _message.id === message.id,
		)

		if (messageIndex <= 0 || message.role !== 'assistant') {
			return
		}

		setMessages(messages.slice(0, messageIndex))

		await reload()
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
