import { useChat } from '@ai-sdk/react'
import { ActionIcon, Box, Stack, Textarea, Tooltip } from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import { IconArrowBackUp, IconArrowUp } from '@tabler/icons-react'
import { type UIMessage } from 'ai'
import { type RefCallback, use, type FormEventHandler } from 'react'
import ChatContext from '../ChatContext'
import chatSchema from '../chatSchema'

interface EditMessageFormProps {
	text: string
	message: UIMessage
	onCancel: () => void
}

const setCursorToEndRef: RefCallback<HTMLTextAreaElement> = (instance) => {
	if (instance) {
		const length = instance.value.length

		instance.setSelectionRange(length, length)

		instance.focus()
	}
}

const EditMessageForm = ({ text, message, onCancel }: EditMessageFormProps) => {
	const { sendMessage } = useChat({
		chat: use(ChatContext),
	})

	const [input, handleInputChange] = useInputState(text)

	const isInputValid = chatSchema.input.safeParse(input).success

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)

		const content = formData.get('content') as string

		onCancel()

		await sendMessage({
			messageId: message.id,
			text: content,
		})
	}

	return (
		<Box component="form" pt="1px" onSubmit={handleSubmit}>
			<Textarea
				ref={setCursorToEndRef}
				name="content"
				autosize
				size="md"
				minRows={3}
				rows={3}
				value={input}
				onChange={handleInputChange}
				onKeyDown={(event) => {
					const isEnterKeyPressed =
						event.key === 'Enter' &&
						!event.shiftKey &&
						!event.nativeEvent.isComposing

					const canSendMessage = isEnterKeyPressed && isInputValid

					if (canSendMessage) {
						const form = event.currentTarget.form as HTMLFormElement

						form.requestSubmit()
					}
				}}
				rightSection={
					<Stack className="h-full" justify="end" py="xs" gap="xs">
						<Tooltip label="Cancel">
							<ActionIcon color="gray" variant="subtle" onClick={onCancel}>
								<IconArrowBackUp className="size-5" />
							</ActionIcon>
						</Tooltip>
						<Tooltip label="Send">
							<ActionIcon type="submit" disabled={!isInputValid}>
								<IconArrowUp className="size-5" />
							</ActionIcon>
						</Tooltip>
					</Stack>
				}
			/>
		</Box>
	)
}

export default EditMessageForm
