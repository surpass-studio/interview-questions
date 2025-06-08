import {
	Button,
	Collapse,
	Divider,
	Group,
	Stack,
	TypographyStylesProvider,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react'
import clsx from 'clsx'
import MemoizedMarkdown from '../MemoizedMarkdown'
import classes from './MessageListItem.module.css'

interface MessageReasoningProps {
	reasoning: string
}

const MessageReasoning = ({ reasoning }: MessageReasoningProps) => {
	const [isOpened, { toggle }] = useDisclosure(true)

	return (
		<Stack align="start" gap="xs">
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
			<Collapse className="max-w-full" in={isOpened}>
				<Group>
					<Divider orientation="vertical" />
					<TypographyStylesProvider
						className={clsx('min-w-0 flex-1', classes.typography)}
						c="gray"
					>
						<MemoizedMarkdown content={reasoning} />
					</TypographyStylesProvider>
				</Group>
			</Collapse>
		</Stack>
	)
}

export default MessageReasoning
