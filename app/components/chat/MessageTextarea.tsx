import { useChat } from '@ai-sdk/react'
import { Box, Button, Group, Stack, Textarea } from '@mantine/core'
import { IconAtom } from '@tabler/icons-react'
import clsx from 'clsx'
import { useRef, useState } from 'react'
import styles from './MessageTextarea.module.css'
import SendMessageButton from './SendMessageButton'
import useChatReasoningToggle from './useChatReasoningToggle'

interface MessageTextareaProps {
	id: string
}

const MessageTextarea = ({ id }: MessageTextareaProps) => {
	const [isCompositionInput, setIsCompositionInput] = useState(false)

	const { isReasoningEnabled, toggleReasoning } = useChatReasoningToggle()

	const { input, isLoading, stop, handleInputChange, handleSubmit } = useChat({
		id,
		body: {
			sendReasoning: isReasoningEnabled,
		},
	})

	const textareaRef = useRef<HTMLTextAreaElement>(null)

	return (
		<Box
			className={clsx(styles.textareaContainer, 'sticky bottom-9')}
			onClick={() => {
				textareaRef.current && textareaRef.current.focus()
			}}
		>
			<form onSubmit={handleSubmit}>
				<Textarea
					ref={textareaRef}
					autosize
					minRows={1}
					rows={1}
					maxRows={10}
					size="md"
					placeholder="Type a message..."
					classNames={{ input: styles.textarea }}
					value={input}
					onChange={handleInputChange}
					onCompositionStart={() => setIsCompositionInput(true)}
					onCompositionEnd={() => setIsCompositionInput(false)}
					onKeyDown={(event) => {
						const canSendMessage =
							!isLoading &&
							event.key === 'Enter' &&
							!event.shiftKey &&
							!isCompositionInput

						if (canSendMessage) {
							event.preventDefault()

							handleSubmit()
						}
					}}
					inputContainer={(children) => (
						<Stack>
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
								<SendMessageButton
									input={input}
									isLoading={isLoading}
									stop={stop}
								/>
							</Group>
						</Stack>
					)}
				/>
			</form>
		</Box>
	)
}

export default MessageTextarea
