import { type UseChatHelpers } from '@ai-sdk/react'
import { ActionIcon, Tooltip } from '@mantine/core'
import { IconPlayerStop, IconSend } from '@tabler/icons-react'
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
				<ActionIcon color="red" variant="subtle" size="input-xs" onClick={stop}>
					<IconPlayerStop className="stroke-1.5" />
				</ActionIcon>
			</Tooltip>
		)
	}

	const isInputValid = v.is(v.pipe(v.string(), v.trim(), v.minLength(1)), input)

	if (isInputValid) {
		return (
			<Tooltip label="Send message">
				<ActionIcon type="submit" variant="subtle" size="input-xs">
					<IconSend className="stroke-1.5" />
				</ActionIcon>
			</Tooltip>
		)
	}

	return (
		<ActionIcon disabled bg="transparent" size="input-xs">
			<IconSend className="stroke-1.5" />
		</ActionIcon>
	)
}

export default SendMessageButton
