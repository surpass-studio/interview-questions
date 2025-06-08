import { Group, Stack } from '@mantine/core'
import { type UIMessage } from 'ai'
import CopyMessageButton from './CopyMessageButton'
import MessageReasoning from './MessageReasoning'
import MessageText from './MessageText'
import RegenerateMessageButton from './RegenerateMessageButton'

interface AssistantMessageProps {
	message: UIMessage
}

const AssistantMessage = ({ message }: AssistantMessageProps) => {
	return (
		<Stack className="wrap-break-word">
			{message.parts.map((part) => {
				if (part.type === 'reasoning') {
					return <MessageReasoning key={part.type} reasoning={part.text} />
				}

				if (part.type === 'text') {
					return (
						<Stack key={part.type} gap="xs">
							<MessageText text={part.text} />
							<Group gap="xs">
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
