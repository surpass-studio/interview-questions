import { Tooltip, ActionIcon, Transition } from '@mantine/core'
import { ArrowUpIcon } from '@phosphor-icons/react'

interface SendMessageButtonProps {
	isInputValid: boolean
}

const SendMessageButton = ({ isInputValid }: SendMessageButtonProps) => {
	return (
		<Transition mounted={isInputValid} transition="slide-left">
			{(styles) => (
				<Tooltip label="Send message">
					<ActionIcon type="submit" style={styles}>
						<ArrowUpIcon className="size-5" />
					</ActionIcon>
				</Tooltip>
			)}
		</Transition>
	)
}

export default SendMessageButton
