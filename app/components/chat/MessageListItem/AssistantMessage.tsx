import { Group, Stack } from '@mantine/core'
import { type UIMessage } from 'ai'
import CopyMessageButton from '../CopyMessageButton'
import RegenerateMessageButton from '../RegenerateMessageButton'
import MessageReasoning from './MessageReasoning'
import MessageText from './MessageText'

interface AssistantMessageProps {
	message: UIMessage
}

const AssistantMessage = ({ message }: AssistantMessageProps) => {
	return (
		<Stack className="group wrap-break-word">
			{message.parts.map((part) => {
				if (part.type === 'reasoning') {
					return <MessageReasoning key={part.type} reasoning={part.reasoning} />
				}

				if (part.type === 'text') {
					return (
						<Stack key={part.type} gap="xs">
							<MessageText text={part.text} />
							<Group
								className="opacity-0 transition-opacity group-hover:opacity-100"
								gap="xs"
							>
								<CopyMessageButton text={part.text} />
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
