import { useChat } from '@ai-sdk/react'
import { ActionIcon, Group, Stack, Textarea, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconAtom } from '@tabler/icons-react'
import { useState } from 'react'
import SendMessageButton from './SendMessageButton'

interface MessageTextareaProps {
	id: string
}

const MessageTextarea = ({ id }: MessageTextareaProps) => {
	const [isCompositionInput, setIsCompositionInput] = useState(false)

	const [sendReasoning, { toggle }] = useDisclosure(true)

	const { input, isLoading, stop, handleInputChange, handleSubmit } = useChat({
		id,
		body: {
			sendReasoning,
		},
	})

	return (
		<Stack className="sticky bottom-9" gap="sm">
			<Group>
				<Tooltip label={sendReasoning ? 'Without reasoning' : 'With reasoning'}>
					<ActionIcon
						color={sendReasoning ? undefined : 'gray'}
						size="md"
						radius="xl"
						variant="light"
						onClick={() => toggle()}
					>
						<IconAtom className="stroke-1.5" />
					</ActionIcon>
				</Tooltip>
			</Group>
			<form onSubmit={handleSubmit}>
				<Textarea
					autosize
					minRows={1}
					rows={1}
					maxRows={10}
					size="md"
					placeholder="Type a message..."
					value={input}
					onChange={handleInputChange}
					onCompositionStart={() => setIsCompositionInput(true)}
					onCompositionEnd={() => setIsCompositionInput(false)}
					onKeyDown={(event) => {
						const canSendMessage =
							!isLoading &&
							event.key === 'Enter' &&
							!event.shiftKey &&
							!isCompositionInput

						if (canSendMessage) {
							event.preventDefault()

							handleSubmit()
						}
					}}
					rightSection={
						<SendMessageButton
							input={input}
							isLoading={isLoading}
							stop={stop}
						/>
					}
				/>
			</form>
		</Stack>
	)
}

export default MessageTextarea
