import {
	Button,
	Collapse,
	Divider,
	Group,
	Loader,
	Paper,
	Stack,
	Alert,
	Text,
	TypographyStylesProvider,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
	IconChevronDown,
	IconChevronRight,
	IconMoodSadDizzy,
} from '@tabler/icons-react'
import { type UIMessage } from 'ai'
import clsx from 'clsx'
import { useRef } from 'react'
import Markdown from 'react-markdown'
import CopyMessageButton from './CopyMessageButton'
import classes from './MessageListItem.module.css'
import RegenerateMessageButton from './RegenerateMessageButton'

interface MessageListItemProps {
	message: UIMessage
}

const MessageListItem = ({ message }: MessageListItemProps) => {
	const [isOpened, { toggle }] = useDisclosure(true)

	const typographyRef = useRef<HTMLDivElement>(null)

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
		<Stack component="li" className="group">
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
										<IconChevronDown className="size-5" />
									) : (
										<IconChevronRight className="size-5" />
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
						<Stack key={part.type} gap="xs">
							<TypographyStylesProvider
								ref={typographyRef}
								className={classes.typography}
							>
								<Markdown>{message.content}</Markdown>
							</TypographyStylesProvider>
							<Group
								className="opacity-0 transition-opacity group-hover:opacity-100"
								gap="xs"
							>
								<CopyMessageButton typographyRef={typographyRef} />
								<RegenerateMessageButton message={message} />
							</Group>
						</Stack>
					)
				}

				return null
			})}
		</Stack>
	)
}

MessageListItem.Pending = () => (
	<Group component="li">
		<Loader type="dots" />
	</Group>
)

interface MessageListItemErrorProps {
	error: Error
}

MessageListItem.Error = ({ error }: MessageListItemErrorProps) => (
	<Alert color="red" title={error.name} icon={<IconMoodSadDizzy />}>
		{error.message}
	</Alert>
)

export default MessageListItem
