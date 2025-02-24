import { Box, Flex, Group, Stack, Textarea } from '@mantine/core'
import { useState, useEffect, useRef } from 'react'
import * as v from 'valibot'
import classes from './ConversationForm.module.css'
import inputValidationSchema from './inputValidationSchema'
import ScrollToBottomButton from './ScrollToBottomButton'
import SendMessageButton from './SendMessageButton'
import ToggleReasoningButton from './ToggleReasoningButton'
import useSharedChat from './useSharedChat'

const ConversationForm = () => {
	const [isCompositionInput, setIsCompositionInput] = useState(false)

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
		<Stack className="sticky bottom-9" gap="xs">
			<Box className="absolute -top-12">
				<ScrollToBottomButton />
			</Box>
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
					onCompositionStart={() => setIsCompositionInput(true)}
					onCompositionEnd={() => setIsCompositionInput(false)}
					onKeyDown={(event) => {
						const canSendMessage =
							(status === 'ready' || status === 'error') &&
							event.key === 'Enter' &&
							!event.shiftKey &&
							!isCompositionInput &&
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
			<Group>
				<ToggleReasoningButton />
			</Group>
		</Stack>
	)
}

export default ConversationForm
