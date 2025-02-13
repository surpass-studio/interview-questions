import { type UseChatHelpers } from '@ai-sdk/react'
import { ActionIcon, Tooltip } from '@mantine/core'
import { IconPlayerStop, IconArrowUp } from '@tabler/icons-react'
import * as v from 'valibot'

type SendMessageButtonProps = Pick<
	UseChatHelpers,
	'input' | 'isLoading' | 'stop'
>

const SendMessageButton = ({
	isLoading,
	input,
	stop,
}: SendMessageButtonProps) => {
	if (isLoading) {
		return (
			<Tooltip label="Stop">
				<ActionIcon color="red" size="lg" variant="subtle" onClick={stop}>
					<IconPlayerStop className="stroke-1.5" />
				</ActionIcon>
			</Tooltip>
		)
	}

	const isInputValid = v.is(v.pipe(v.string(), v.trim(), v.minLength(1)), input)

	if (isInputValid) {
		return (
			<Tooltip label="Send message">
				<ActionIcon type="submit" size="lg" radius="lg">
					<IconArrowUp className="stroke-1.5" />
				</ActionIcon>
			</Tooltip>
		)
	}

	return (
		<ActionIcon disabled bg="transparent" size="lg">
			<IconArrowUp className="stroke-1.5" />
		</ActionIcon>
	)
}

export default SendMessageButton
