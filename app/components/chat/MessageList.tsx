import { Box, ScrollArea, Stack } from '@mantine/core'
import { useStickToBottom } from 'use-stick-to-bottom'
import MessageListItem from './MessageListItem'
import ScrollToBottomButton from './ScrollToBottomButton'
import useSharedChat from './useSharedChat'

const MessageList = () => {
	const { status, error, messages } = useSharedChat()

	const lastMessage = messages[messages.length - 1]

	const isPending =
		(status === 'submitted' || status === 'streaming') &&
		lastMessage &&
		lastMessage.role === 'user'

	const { scrollRef, contentRef, isAtBottom, scrollToBottom } =
		useStickToBottom()

	return (
		<Box className="relative flex-1">
			<ScrollArea.Autosize
				viewportRef={scrollRef}
				className="absolute max-h-full w-full [&>*]:max-w-full"
				offsetScrollbars
			>
				<Stack ref={contentRef} component="ul" gap="xl">
					{messages.map((message) => (
						<MessageListItem key={message.id} message={message} />
					))}
					{isPending && <MessageListItem.Pending />}
					{error && <MessageListItem.Error error={error} />}
				</Stack>
			</ScrollArea.Autosize>
			<Box className="absolute bottom-6">
				<ScrollToBottomButton
					isAtBottom={isAtBottom}
					scrollToBottom={scrollToBottom}
				/>
			</Box>
		</Box>
	)
}

export default MessageList
