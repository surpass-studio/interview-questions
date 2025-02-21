import { useChat, type UseChatHelpers } from '@ai-sdk/react'
import { Box, Flex, Group, Stack, Textarea } from '@mantine/core'
import { useState } from 'react'
import { href, useFetcher } from 'react-router'
import classes from './MessageTextarea.module.css'
import ScrollToBottomButton from './ScrollToBottomButton'
import SendMessageButton from './SendMessageButton'
import ToggleReasoningButton from './ToggleReasoningButton'
import useChatId from './useChatId'
import useChatReasoningToggle from './useChatReasoningToggle'

const MessageTextarea = () => {
	const [isCompositionInput, setIsCompositionInput] = useState(false)

	const { isReasoningEnabled } = useChatReasoningToggle()

	const { chatId } = useChatId()

	const { input, status, stop, handleInputChange, handleSubmit } = useChat({
		id: chatId,
		body: {
			sendReasoning: isReasoningEnabled,
		},
	})

	const fetcher = useFetcher()

	const submit: UseChatHelpers['handleSubmit'] = async (event) => {
		event && event.preventDefault && event.preventDefault()

		if (!chatId) {
			await fetcher.submit(null, { action: href('/chat'), method: 'post' })
		}

		handleSubmit(event)
	}

	return (
		<Stack className="sticky bottom-9" gap="xs">
			<Box className="absolute -top-12">
				<ScrollToBottomButton />
			</Box>
			<form onSubmit={submit}>
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
							fetcher.state === 'idle' &&
							event.key === 'Enter' &&
							!event.shiftKey &&
							!isCompositionInput

						if (canSendMessage) {
							submit(event)
						}
					}}
					inputContainer={(children) => (
						<Flex className={classes.textareaContainer}>
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
