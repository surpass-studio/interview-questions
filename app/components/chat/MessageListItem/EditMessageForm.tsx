import { useChat } from '@ai-sdk/react'
import {
	ActionIcon,
	Box,
	FocusTrap,
	Stack,
	Textarea,
	Tooltip,
} from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import { IconArrowBackUp, IconArrowUp } from '@tabler/icons-react'
import { type UIMessage } from 'ai'
import { use, type FormEventHandler } from 'react'
import * as v from 'valibot'
import ChatContext from '../ChatContext'
import chatSchema from '../chatSchema'

interface EditMessageFormProps {
	text: string
	message: UIMessage
	onCancel: () => void
}

const EditMessageForm = ({ text, message, onCancel }: EditMessageFormProps) => {
	const { messages, reload, setMessages } = useChat({ chat: use(ChatContext) })

	const [input, handleInputChange] = useInputState(text)

	const isInputValid = v.is(chatSchema.input, input)

	const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)

		const content = formData.get('content') as string

		const messageIndex = messages.findIndex(
			(_message) => _message.id === message.id,
		)

		if (messageIndex === -1) {
			throw new Error('Message not found')
		}

		setMessages((messages) =>
			messages.slice(0, messageIndex).concat([
				{
					...message,
					parts: [
						{
							type: 'text',
							text: content,
						},
					],
				},
			]),
		)

		onCancel()

		void reload()
	}

	return (
		<Box component="form" pt="1px" onSubmit={handleSubmit}>
			<FocusTrap>
				<Textarea
					name="content"
					autosize
					size="md"
					minRows={3}
					rows={3}
					value={input}
					onChange={handleInputChange}
					onKeyDown={(event) => {
						const canSendMessage =
							event.key === 'Enter' &&
							!event.shiftKey &&
							!event.nativeEvent.isComposing &&
							isInputValid

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
			</FocusTrap>
		</Box>
	)
}

export default EditMessageForm
