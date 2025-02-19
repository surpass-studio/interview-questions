import { useChat } from '@ai-sdk/react'
import { Box, Button, Group, Stack, Textarea } from '@mantine/core'
import { IconAtom } from '@tabler/icons-react'
import { useRef, useState } from 'react'
import classes from './MessageTextarea.module.css'
import ScrollToBottomButton from './ScrollToBottomButton'
import SendMessageButton from './SendMessageButton'
import useChatReasoningToggle from './useChatReasoningToggle'

interface MessageTextareaProps {
	id: string
}

const MessageTextarea = ({ id }: MessageTextareaProps) => {
	const [isCompositionInput, setIsCompositionInput] = useState(false)

	const { isReasoningEnabled, toggleReasoning } = useChatReasoningToggle()

	const { input, status, stop, handleInputChange, handleSubmit } = useChat({
		id,
		body: {
			sendReasoning: isReasoningEnabled,
		},
	})

	const textareaRef = useRef<HTMLTextAreaElement>(null)

	return (
		<Box className="sticky bottom-9">
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
					classNames={{ input: classes.textarea }}
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
						<Stack
							className={classes.textareaContainer}
							onClick={() => {
								textareaRef.current && textareaRef.current.focus()
							}}
						>
							{children}
							<Group justify="space-between">
								<Button
									color={isReasoningEnabled ? undefined : 'gray'}
									size="compact-sm"
									radius="lg"
									variant={isReasoningEnabled ? 'light' : 'light'}
									leftSection={<IconAtom className="stroke-1.5 size-5" />}
									onClick={() => toggleReasoning()}
								>
									Reasoning
								</Button>
								<SendMessageButton input={input} status={status} stop={stop} />
							</Group>
						</Stack>
					)}
				/>
			</form>
		</Box>
	)
}

export default MessageTextarea
