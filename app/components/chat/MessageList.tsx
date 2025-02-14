import { useChat } from '@ai-sdk/react'
import { SignInButton, useAuth } from '@clerk/react-router'
import { Button, Group, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import { IconSparkles } from '@tabler/icons-react'
import MessageListItem from './MessageListItem'
import QuickPromptList from './QuickPromptList'
import useChatAutoScroll from './useChatAutoScroll'

interface MessageListProps {
	id: string
}

const MessageList = ({ id }: MessageListProps) => {
	const { isLoading, messages } = useChat({ id })

	const lastMessage = messages[messages.length - 1]

	const isPending = isLoading && lastMessage && lastMessage.role === 'user'

	const { userId } = useAuth()

	useChatAutoScroll(id)

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
			<Stack className="flex-1" justify="center" align="center" gap="xl">
				<Group gap="xs">
					<ThemeIcon size="lg" variant="transparent">
						<IconSparkles className="stroke-1.5 size-full" />
					</ThemeIcon>
					<Title order={2}>开始与 AI 助手对话吧</Title>
				</Group>
				<Text c="gray" size="sm">
					选择下方预设问题，或直接输入您想问的问题
				</Text>
				<QuickPromptList id={id} />
			</Stack>
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
