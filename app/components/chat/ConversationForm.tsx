import { useChat } from '@ai-sdk/react'
import { Container, Flex, Group, Textarea } from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import { type FormEventHandler, use, useEffect } from 'react'
import * as v from 'valibot'
import ChatContext from './ChatContext'
import classes from './ConversationForm.module.css'
import inputValidationSchema from './inputValidationSchema'
import SendMessageButton from './SendMessageButton'

const ConversationForm = () => {
	const chat = use(ChatContext)

	const { status, sendMessage, stop } = useChat({
		chat,
	})

	const [input, handleInputChange] = useInputState('')

	const isInputValid = v.is(inputValidationSchema, input)

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault()

		handleInputChange('')

		await sendMessage({ text: input })
	}

	useEffect(() => {
		if (
			chat.status === 'ready' &&
			chat.lastMessage &&
			chat.lastMessage.role === 'user'
		) {
			void chat.reload()
		}
	}, [chat])

	return (
		<Container className="w-full">
			<form onSubmit={handleSubmit}>
				<Textarea
					autosize
					minRows={1}
					rows={1}
					maxRows={10}
					size="md"
					placeholder="Type a message..."
					classNames={{ wrapper: 'flex-1', input: classes.textarea }}
					value={input}
					onChange={handleInputChange}
					onKeyDown={(event) => {
						const canSendMessage =
							(status === 'ready' || status === 'error') &&
							event.key === 'Enter' &&
							!event.shiftKey &&
							!event.nativeEvent.isComposing &&
							isInputValid

						if (canSendMessage) {
							const form = event.currentTarget.form as HTMLFormElement

							form.requestSubmit()
						}
					}}
					inputContainer={(children) => (
						<Flex className={classes.textareaContainer}>
							{children}
							<Group className={classes.submitButtonContainer}>
								<SendMessageButton
									isLoading={status === 'submitted' || status === 'streaming'}
									isInputValid={isInputValid}
									stop={stop}
								/>
							</Group>
						</Flex>
					)}
				/>
			</form>
		</Container>
	)
}

export default ConversationForm
