import { useChat } from '@ai-sdk/react'
import { SignInButton, useAuth } from '@clerk/react-router'
import { Center, Button, Group, Stack, Text, ThemeIcon } from '@mantine/core'
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

	const { userId } = useAuth()

	useEffect(() => {
		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: 'smooth',
		})
	}, [messages])

	if (!userId) {
		return (
			<Stack className="flex-1" justify="center" align="center">
				<Group gap="xs">
					<ThemeIcon variant="transparent">
						<IconSparkles className="stroke-1.5" />
					</ThemeIcon>
					<Text>Please sign in to start the conversation.</Text>
				</Group>
				<SignInButton>
					<Button variant="subtle">Sign in</Button>
				</SignInButton>
			</Stack>
		)
	}

	if (messages.length === 0) {
		return (
			<Center className="flex-1">
				<Group gap="xs">
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
