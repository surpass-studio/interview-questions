import { useChat } from '@ai-sdk/react'
import { Tooltip, ActionIcon } from '@mantine/core'
import { IconRefresh } from '@tabler/icons-react'
import { type UIMessage } from 'ai'
import { use } from 'react'
import ChatContext from '../ChatContext'

interface RegenerateMessageButtonProps {
	message?: UIMessage
}

const RegenerateMessageButton = ({ message }: RegenerateMessageButtonProps) => {
	const { regenerate } = useChat({
		chat: use(ChatContext),
	})

	return (
		<Tooltip label="Regenerate">
			<ActionIcon
				color="gray"
				variant="subtle"
				onClick={() => {
					if (message) {
						void regenerate({ messageId: message.id })
					}
				}}
			>
				<IconRefresh className="size-5" />
			</ActionIcon>
		</Tooltip>
	)
}

export default RegenerateMessageButton
