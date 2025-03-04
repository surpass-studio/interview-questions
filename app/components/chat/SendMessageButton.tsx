import { Tooltip, ActionIcon, Transition } from '@mantine/core'
import { IconPlayerStop, IconArrowUp } from '@tabler/icons-react'

interface SendMessageButtonProps {
	isLoading: boolean
	isInputValid: boolean
	stop?: () => void
}

const SendMessageButton = ({
	isLoading,
	isInputValid,
	stop,
}: SendMessageButtonProps) => {
	if (isLoading) {
		return (
			<Tooltip label="Stop">
				<ActionIcon color="red" variant="light" onClick={stop}>
					<IconPlayerStop className="size-5" />
				</ActionIcon>
			</Tooltip>
		)
	}

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
