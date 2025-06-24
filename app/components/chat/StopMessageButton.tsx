import { useChat } from '@ai-sdk/react'
import { Tooltip, ActionIcon } from '@mantine/core'
import { StopCircleIcon } from '@phosphor-icons/react'
import { use } from 'react'
import ChatContext from './ChatContext'

const StopMessageButton = () => {
	const { stop } = useChat({ chat: use(ChatContext) })

	return (
		<Tooltip label="Stop">
			<ActionIcon color="red" variant="light" onClick={stop}>
				<StopCircleIcon className="size-5" />
			</ActionIcon>
		</Tooltip>
	)
}

export default StopMessageButton
