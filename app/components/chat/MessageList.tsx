import { useChat } from '@ai-sdk/react'
import { Box, Container, Loader, ScrollArea, Stack } from '@mantine/core'
import { use, useMemo } from 'react'
import { useStickToBottom } from 'use-stick-to-bottom'
import ChatContext from './ChatContext'
import ErrorMessage from './MessageListItem/ErrorMessage'
import MessageListItem from './MessageListItem/MessageListItem'
import ScrollToBottomButton from './ScrollToBottomButton'

const chunk = <T,>(array: T[], size: number): T[][] =>
	Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
		array.slice(index * size, index * size + size),
	)

const MessageList = () => {
	const { status, error, messages } = useChat({
		chat: use(ChatContext),
	})

	const lastMessage = messages[messages.length - 1]

	const isPending =
		(status === 'submitted' || status === 'streaming') &&
		lastMessage &&
		lastMessage.role === 'user'

	const { scrollRef, contentRef, isAtBottom, scrollToBottom } =
		useStickToBottom()

	const chunkedMessages = useMemo(() => chunk(messages, 2), [messages])

	return (
		<Box className="@container-[size] relative flex-1">
			<ScrollArea.Autosize
				viewportRef={scrollRef}
				className="absolute max-h-full w-full [&>*]:max-w-full"
			>
				<Container ref={contentRef}>
					<Stack gap="xl">
						{chunkedMessages.map((messages, index) => (
							<Stack key={index} className="last:min-h-[100cqh]" gap="xl">
								{messages.map((message) => (
									<MessageListItem key={message.id} message={message} />
								))}
								{index === chunkedMessages.length - 1 && (
									<>
										{isPending && <Loader type="dots" />}
										{error && <ErrorMessage error={error} />}
									</>
								)}
							</Stack>
						))}
					</Stack>
				</Container>
			</ScrollArea.Autosize>
			<Box className="absolute bottom-6 left-1/2 -translate-x-1/2">
				<ScrollToBottomButton
					isAtBottom={isAtBottom}
					scrollToBottom={scrollToBottom}
				/>
			</Box>
		</Box>
	)
}

export default MessageList
