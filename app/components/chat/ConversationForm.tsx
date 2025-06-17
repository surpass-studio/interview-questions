import { useChat } from '@ai-sdk/react'
import { Container, Flex, Group, Textarea } from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import { type FormEventHandler, use, useEffect } from 'react'
import ChatContext from './ChatContext'
import chatSchema from './chatSchema'
import classes from './ConversationForm.module.css'
import SendMessageButton from './SendMessageButton'
import StopMessageButton from './StopMessageButton'

const ConversationForm = () => {
	const chat = use(ChatContext)

	const { status, sendMessage } = useChat({
		chat,
	})

	const isLoading = status === 'submitted' || status === 'streaming'

	const [input, handleInputChange] = useInputState('')

	const isInputValid = chatSchema.input.safeParse(input).success

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
						const isEnterKeyPressed =
							event.key === 'Enter' &&
							!event.shiftKey &&
							!event.nativeEvent.isComposing

						const canSendMessage =
							(status === 'ready' || status === 'error') &&
							isEnterKeyPressed &&
							isInputValid

						if (canSendMessage) {
							event.preventDefault()

							const form = event.currentTarget.form as HTMLFormElement

							form.requestSubmit()
						}
					}}
					inputContainer={(children) => (
						<Flex className={classes.textareaContainer}>
							{children}
							<Group className={classes.submitButtonContainer}>
								{isLoading ? (
									<StopMessageButton />
								) : (
									<SendMessageButton isInputValid={isInputValid} />
								)}
							</Group>
						</Flex>
					)}
				/>
			</form>
		</Container>
	)
}

export default ConversationForm
