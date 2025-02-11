import { useChat } from '@ai-sdk/react'
import { Box, Card, Stack, TypographyStylesProvider } from '@mantine/core'
import Markdown from 'react-markdown'
import styles from './markdown.module.css'

interface MessageListProps {
	id: string
}

const MessageList = ({ id }: MessageListProps) => {
	const { messages } = useChat({ id })

	return (
		<Stack className="flex-1">
			{messages.map((message) => {
				if (message.role === 'user') {
					return (
						<Card key={message.id} padding="sm" className="self-end">
							{message.content}
						</Card>
					)
				}

				return (
					<Box key={message.id}>
						<TypographyStylesProvider>
							<Markdown className={styles.markdown}>{message.content}</Markdown>
						</TypographyStylesProvider>
					</Box>
				)
			})}
		</Stack>
	)
}

export default MessageList
