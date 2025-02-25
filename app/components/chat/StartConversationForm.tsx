import { Flex, Group, Stack, Textarea } from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import { useState } from 'react'
import { useFetcher } from 'react-router'
import * as v from 'valibot'
import classes from './ConversationForm.module.css'
import inputValidationSchema from './inputValidationSchema'
import SendMessageButton from './SendMessageButton'
import ToggleReasoningButton from './ToggleReasoningButton'

const StartConversationForm = () => {
	const [isCompositionInput, setIsCompositionInput] = useState(false)

	const fetcher = useFetcher()

	const [input, handleInputChange] = useInputState('')

	const isInputValid = v.is(inputValidationSchema, input)

	return (
		<Stack gap="xs">
			<fetcher.Form method="post" action="/api/chat/create">
				<Textarea
					name="content"
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
					onKeyDown={async (event) => {
						const canSendMessage =
							fetcher.state === 'idle' &&
							event.key === 'Enter' &&
							!event.shiftKey &&
							!isCompositionInput &&
							isInputValid

						if (canSendMessage) {
							event.preventDefault()

							const form = (event.target as HTMLElement).closest('form')

							await fetcher.submit(form)
						}
					}}
					inputContainer={(children) => (
						<Flex className={classes.textareaContainer}>
							{children}
							<Group className={classes.submitButtonContainer}>
								<SendMessageButton
									isLoading={
										fetcher.state === 'loading' ||
										fetcher.state === 'submitting'
									}
									isInputValid={isInputValid}
								/>
							</Group>
						</Flex>
					)}
				/>
			</fetcher.Form>
			<Group>
				<ToggleReasoningButton />
			</Group>
		</Stack>
	)
}

export default StartConversationForm
