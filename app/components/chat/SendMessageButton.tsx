import { type UseChatHelpers } from '@ai-sdk/react'
import { Tooltip, ActionIcon, Transition } from '@mantine/core'
import { IconPlayerStop, IconArrowUp } from '@tabler/icons-react'
import * as v from 'valibot'

type SendMessageButtonProps = Pick<UseChatHelpers, 'input' | 'status' | 'stop'>

const SendMessageButton = ({ status, input, stop }: SendMessageButtonProps) => {
	if (status === 'submitted' || status === 'streaming') {
		return (
			<Tooltip label="Stop">
				<ActionIcon color="red" size="md" variant="subtle" onClick={stop}>
					<IconPlayerStop className="stroke-1.5 size-5" />
				</ActionIcon>
			</Tooltip>
		)
	}

	const isInputValid = v.is(v.pipe(v.string(), v.trim(), v.minLength(1)), input)

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
