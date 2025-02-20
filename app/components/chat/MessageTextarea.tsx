import { useChat } from '@ai-sdk/react'
import { Box, Flex, Group, Stack, Textarea } from '@mantine/core'
import { useRef, useState } from 'react'
import classes from './MessageTextarea.module.css'
import ScrollToBottomButton from './ScrollToBottomButton'
import SendMessageButton from './SendMessageButton'
import ToggleReasoningButton from './ToggleReasoningButton'
import useChatReasoningToggle from './useChatReasoningToggle'

interface MessageTextareaProps {
	id: string
}

const MessageTextarea = ({ id }: MessageTextareaProps) => {
	const [isCompositionInput, setIsCompositionInput] = useState(false)

	const { isReasoningEnabled } = useChatReasoningToggle()

	const { input, status, stop, handleInputChange, handleSubmit } = useChat({
		id,
		body: {
			sendReasoning: isReasoningEnabled,
		},
	})

	const textareaRef = useRef<HTMLTextAreaElement>(null)

	return (
		<Stack className="sticky bottom-9" gap="xs">
			<Box className="absolute -top-12">
				<ScrollToBottomButton />
			</Box>
			<form onSubmit={handleSubmit}>
				<Textarea
					ref={textareaRef}
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
							!isCompositionInput

						if (canSendMessage) {
							event.preventDefault()

							handleSubmit()
						}
					}}
					inputContainer={(children) => (
						<Flex
							className={classes.textareaContainer}
							onClick={() => {
								textareaRef.current && textareaRef.current.focus()
							}}
						>
							{children}
							<Group className={classes.submitButtonContainer}>
								<SendMessageButton input={input} status={status} stop={stop} />
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

export default MessageTextarea
