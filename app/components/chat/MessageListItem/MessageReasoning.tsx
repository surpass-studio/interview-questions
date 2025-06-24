import { Button, Collapse, Divider, Group, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { CaretDownIcon, CaretRightIcon } from '@phosphor-icons/react'
import MemoizedMarkdown from './MemoizedMarkdown'

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
						<CaretDownIcon className="size-5" />
					) : (
						<CaretRightIcon className="size-5" />
					)
				}
				onClick={() => toggle()}
			>
				Thought process
			</Button>
			<Collapse className="max-w-full" in={isOpened}>
				<Group>
					<Divider orientation="vertical" />
					<Stack className="min-w-0 flex-1 break-words" c="gray">
						<MemoizedMarkdown content={reasoning} />
					</Stack>
				</Group>
			</Collapse>
		</Stack>
	)
}

export default MessageReasoning
