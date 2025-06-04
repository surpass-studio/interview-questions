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
	IconAlertTriangle,
} from '@tabler/icons-react'
import { type UIMessage } from 'ai'
import clsx from 'clsx'
import { useRef } from 'react'
import CopyMessageButton from './CopyMessageButton'
import MemoizedMarkdown from './MemoizedMarkdown'
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
					{message.parts.map((part) =>
						part.type === 'text' ? (
							<Text key={part.type}>{part.text}</Text>
						) : null,
					)}
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
								Thought process
							</Button>

							<Collapse in={isOpened}>
								<Group key={part.type}>
									<Divider orientation="vertical" />
									<TypographyStylesProvider
										className={clsx('flex-1', classes.typography)}
										c="gray"
									>
										<MemoizedMarkdown content={part.reasoning} />
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
								<MemoizedMarkdown content={part.text} />
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
	<Alert color="red" icon={<IconAlertTriangle />}>
		<Text c="red">{error.message}</Text>
	</Alert>
)

export default MessageListItem
