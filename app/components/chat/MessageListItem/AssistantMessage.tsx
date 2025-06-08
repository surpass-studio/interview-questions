import { Group, Stack, TypographyStylesProvider } from '@mantine/core'
import { type UIMessage } from 'ai'
import { useRef } from 'react'
import CopyMessageButton from '../CopyMessageButton'
import MemoizedMarkdown from '../MemoizedMarkdown'
import RegenerateMessageButton from '../RegenerateMessageButton'
import classes from './MessageListItem.module.css'
import MessageReasoning from './MessageReasoning'

interface AssistantMessageProps {
	message: UIMessage
}

const AssistantMessage = ({ message }: AssistantMessageProps) => {
	const typographyRef = useRef<HTMLDivElement>(null)

	return (
		<Stack className="group wrap-break-word">
			{message.parts.map((part) => {
				if (part.type === 'reasoning') {
					return <MessageReasoning key={part.type} reasoning={part.reasoning} />
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

export default AssistantMessage
