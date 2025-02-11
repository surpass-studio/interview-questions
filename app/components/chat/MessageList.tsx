import { useChat } from '@ai-sdk/react'
import {
	Avatar,
	Center,
	Group,
	Loader,
	Paper,
	Stack,
	Text,
	ThemeIcon,
	TypographyStylesProvider,
} from '@mantine/core'
import { IconSparkles } from '@tabler/icons-react'
import { type AnimationProps, motion } from 'motion/react'
import { useEffect } from 'react'
import Markdown from 'react-markdown'
import styles from './MessageList.module.css'

interface MessageListProps {
	id: string
}

const animationProps: AnimationProps = {
	initial: { y: 5, opacity: 0 },
	animate: { y: 0, opacity: 1 },
}

const MessageList = ({ id }: MessageListProps) => {
	const { isLoading, messages } = useChat({ id })

	const lastMessage = messages[messages.length - 1]

	const isThinking = isLoading && lastMessage && lastMessage.role === 'user'

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
		<Stack component="ol" className="flex-1" gap="xl">
			{messages.map((message) => {
				if (message.role === 'user') {
					return (
						<motion.li
							key={message.id}
							className="max-w-5/6 self-end"
							{...animationProps}
						>
							<Paper p="sm" className={styles.userListItemContent}>
								<Text>{message.content}</Text>
							</Paper>
						</motion.li>
					)
				}

				return (
					<motion.li key={message.id} {...animationProps}>
						<Group align="start">
							<Avatar>
								<ThemeIcon variant="transparent">
									<IconSparkles className="stroke-1.5" />
								</ThemeIcon>
							</Avatar>
							<TypographyStylesProvider className="flex-1">
								<Markdown className={styles.markdown}>
									{message.content}
								</Markdown>
							</TypographyStylesProvider>
						</Group>
					</motion.li>
				)
			})}

			{isThinking && (
				<motion.li {...animationProps}>
					<Group>
						<Avatar>
							<ThemeIcon variant="transparent">
								<IconSparkles className="stroke-1.5" />
							</ThemeIcon>
						</Avatar>
						<Loader type="dots" />
					</Group>
				</motion.li>
			)}
		</Stack>
	)
}

export default MessageList
