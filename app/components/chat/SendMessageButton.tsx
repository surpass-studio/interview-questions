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
				<ActionIcon color="red" size="md" variant="subtle" onClick={stop}>
					<IconPlayerStop className="stroke-1.5 size-5" />
				</ActionIcon>
			</Tooltip>
		)
	}

	return (
		<Transition mounted={isInputValid} transition="slide-left">
			{(styles) => (
				<Tooltip label="Send message">
					<ActionIcon type="submit" size="md" radius="lg" style={styles}>
						<IconArrowUp className="stroke-1.5 size-5" />
					</ActionIcon>
				</Tooltip>
			)}
		</Transition>
	)
}

export default SendMessageButton
