import { Flex, Group, Textarea } from '@mantine/core'
import { useEffect, useRef } from 'react'
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

	const isInitialized = useRef(false)

	useEffect(() => {
		const firstMessage = messages[0]

		if (
			status === 'ready' &&
			messages.length === 1 &&
			firstMessage &&
			firstMessage.role === 'user' &&
			!isInitialized.current
		) {
			isInitialized.current = true

			void reload()
		}
	}, [messages, status, reload])

	return (
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
	)
}

export default ConversationForm
