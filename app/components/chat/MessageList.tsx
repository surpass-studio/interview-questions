import { useChat } from '@ai-sdk/react'
import { Center, Group, Stack, Text, ThemeIcon } from '@mantine/core'
import { IconSparkles } from '@tabler/icons-react'
import { useEffect } from 'react'
import MessageListItem from './MessageListItem'

interface MessageListProps {
	id: string
}

const MessageList = ({ id }: MessageListProps) => {
	const { isLoading, messages } = useChat({ id })

	const lastMessage = messages[messages.length - 1]

	const isPending = isLoading && lastMessage && lastMessage.role === 'user'

	useEffect(() => {
		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: 'smooth',
		})
	}, [messages])

	if (messages.length === 0) {
		return (
			<Center className="flex-1">
				<Group>
					<ThemeIcon variant="transparent">
						<IconSparkles className="stroke-1.5" />
					</ThemeIcon>
					<Text>
						No messages yet. Start the conversation by typing a message in the
						input.
					</Text>
				</Group>
			</Center>
		)
	}

	return (
		<Stack component="ul" className="flex-1" gap="xl">
			{messages.map((message) => (
				<MessageListItem key={message.id} message={message} />
			))}

			{isPending && <MessageListItem.Pending />}
		</Stack>
	)
}

export default MessageList
