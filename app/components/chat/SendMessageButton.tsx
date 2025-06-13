import { Tooltip, ActionIcon, Transition } from '@mantine/core'
import { IconArrowUp } from '@tabler/icons-react'

interface SendMessageButtonProps {
	isInputValid: boolean
}

const SendMessageButton = ({ isInputValid }: SendMessageButtonProps) => {
	return (
		<Transition mounted={isInputValid} transition="slide-left">
			{(styles) => (
				<Tooltip label="Send message">
					<ActionIcon type="submit" style={styles}>
						<IconArrowUp className="size-5" />
					</ActionIcon>
				</Tooltip>
			)}
		</Transition>
	)
}

export default SendMessageButton
