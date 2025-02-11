import { useChat } from '@ai-sdk/react'
import {
	Avatar,
	Card,
	Center,
	Group,
	Stack,
	Text,
	ThemeIcon,
	TypographyStylesProvider,
} from '@mantine/core'
import { IconSparkles } from '@tabler/icons-react'
import clsx from 'clsx'
import { useEffect } from 'react'
import Markdown from 'react-markdown'
import styles from './MessageList.module.css'

interface MessageListProps {
	id: string
}

const MessageList = ({ id }: MessageListProps) => {
	const { messages } = useChat({ id })

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
		<Stack className="flex-1" gap="xl">
			{messages.map((message) => {
				if (message.role === 'user') {
					return (
						<Card
							key={message.id}
							padding="sm"
							className={clsx('max-w-5/6 self-end', styles.userListItem)}
						>
							<Text>{message.content}</Text>
						</Card>
					)
				}

				return (
					<Group key={message.id} align="start">
						<Avatar>
							<ThemeIcon variant="transparent">
								<IconSparkles className="stroke-1.5" />
							</ThemeIcon>
						</Avatar>
						<TypographyStylesProvider className="flex-1">
							<Markdown className={styles.markdown}>{message.content}</Markdown>
						</TypographyStylesProvider>
					</Group>
				)
			})}
		</Stack>
	)
}

export default MessageList
