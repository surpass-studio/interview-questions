import {
	Avatar,
	Button,
	Collapse,
	Divider,
	Group,
	Loader,
	Paper,
	Stack,
	Text,
	ThemeIcon,
	TypographyStylesProvider,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
	IconChevronDown,
	IconChevronRight,
	IconSparkles,
} from '@tabler/icons-react'
import { type UIMessage } from 'ai'
import clsx from 'clsx'
import Markdown from 'react-markdown'
import classes from './MessageListItem.module.css'

interface MessageListItemProps {
	message: UIMessage
}

const MessageListItem = ({ message }: MessageListItemProps) => {
	const [isOpened, { toggle }] = useDisclosure(true)

	if (message.role === 'user') {
		return (
			<li key={message.id} className="max-w-5/6 self-end">
				<Paper p="sm" className={classes.userListItemContent}>
					<Text>{message.content}</Text>
				</Paper>
			</li>
		)
	}

	return (
		<Group component="li" align="start">
			<Avatar>
				<ThemeIcon variant="transparent">
					<IconSparkles className="stroke-1.5" />
				</ThemeIcon>
			</Avatar>
			<Stack className="flex-1">
				{message.parts.map((part) => {
					if (part.type === 'reasoning') {
						return (
							<Stack key={part.type} align="start" gap="xs">
								<Button
									size="compact-sm"
									color={isOpened ? undefined : 'gray'}
									variant="subtle"
									rightSection={
										isOpened ? (
											<IconChevronDown className="stroke-1.5 size-5" />
										) : (
											<IconChevronRight className="stroke-1.5 size-5" />
										)
									}
									onClick={() => toggle()}
								>
									Reasoning
								</Button>

								<Collapse in={isOpened}>
									<Group key={part.type}>
										<Divider orientation="vertical" />
										<TypographyStylesProvider
											className={clsx('flex-1', classes.typography)}
											c="gray"
										>
											<Markdown>{part.reasoning}</Markdown>
										</TypographyStylesProvider>
									</Group>
								</Collapse>
							</Stack>
						)
					}

					if (part.type === 'text') {
						return (
							<TypographyStylesProvider
								key={part.type}
								className={classes.markdown}
							>
								<Markdown>{message.content}</Markdown>
							</TypographyStylesProvider>
						)
					}

					return null
				})}
			</Stack>
		</Group>
	)
}

MessageListItem.Pending = () => (
	<Group component="li">
		<Avatar>
			<ThemeIcon variant="transparent">
				<IconSparkles className="stroke-1.5" />
			</ThemeIcon>
		</Avatar>
		<Loader type="dots" />
	</Group>
)

export default MessageListItem
