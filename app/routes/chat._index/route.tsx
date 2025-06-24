import { useAuth, SignInButton } from '@clerk/react-router'
import { Stack, Group, ThemeIcon, Title, Button, Text } from '@mantine/core'
import { SparkleIcon } from '@phosphor-icons/react'
import QuickPromptList from '@/components/chat/QuickPromptList'
import StartConversationForm from '@/components/chat/StartConversationForm'

const ChatPage = () => {
	const { userId } = useAuth()

	if (userId) {
		return (
			<Stack className="h-full">
				<Stack className="flex-1" justify="center" align="center" gap="xl">
					<Group gap="xs">
						<ThemeIcon size="lg" variant="transparent">
							<SparkleIcon className="size-full" weight="fill" />
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
				<StartConversationForm />
			</Stack>
		)
	}

	return (
		<Stack className="h-full" justify="center" align="center">
			<Group gap="xs">
				<ThemeIcon variant="transparent">
					<SparkleIcon className="size-6" weight="fill" />
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
