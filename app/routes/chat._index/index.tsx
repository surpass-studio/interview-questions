import { useAuth, SignInButton } from '@clerk/react-router'
import { Stack, Group, ThemeIcon, Title, Button, Text } from '@mantine/core'
import { IconSparkles } from '@tabler/icons-react'
import MessageTextarea from '@/components/chat/MessageTextarea'
import QuickPromptList from '@/components/chat/QuickPromptList'

const ChatPage = () => {
	const { userId } = useAuth()

	if (userId) {
		return (
			<Stack className="h-full">
				<Stack className="flex-1" justify="center" align="center" gap="xl">
					<Group gap="xs">
						<ThemeIcon size="lg" variant="transparent">
							<IconSparkles className="stroke-1.5 size-full" />
						</ThemeIcon>
						<Title order={2}>
							开始与
							<Text span inherit variant="gradient">
								{' AI '}
							</Text>
							助手对话吧
						</Title>
					</Group>
					<Text c="gray" size="sm">
						选择下方预设问题，或直接输入您想问的问题
					</Text>
					<QuickPromptList />
				</Stack>
				<MessageTextarea />
			</Stack>
		)
	}

	return (
		<Stack className="h-full" justify="center" align="center">
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

export default ChatPage
