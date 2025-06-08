import { Container, Flex, Group, Textarea } from '@mantine/core'
import { useEffect } from 'react'
import * as v from 'valibot'
import classes from './ConversationForm.module.css'
import inputValidationSchema from './inputValidationSchema'
import SendMessageButton from './SendMessageButton'
import useSharedChat from './useSharedChat'

const ConversationForm = () => {
	const {
		input,
		status,
		messages,
		stop,
		reload,
		handleInputChange,
		handleSubmit,
	} = useSharedChat()

	const isInputValid = v.is(inputValidationSchema, input)

	useEffect(() => {
		const lastMessage = messages[messages.length - 1]

		if (
			status === 'ready' &&
			messages.length > 0 &&
			lastMessage &&
			lastMessage.role === 'user'
		) {
			void reload()
		}
	}, [messages, status, reload])

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
							handleSubmit(event)
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
