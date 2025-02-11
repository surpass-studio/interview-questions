import { useChat } from '@ai-sdk/react'
import { Textarea } from '@mantine/core'
import { useState } from 'react'
import SendMessageButton from './SendMessageButton'

interface MessageTextareaProps {
	id: string
}

const MessageTextarea = ({ id }: MessageTextareaProps) => {
	const [isCompositionInput, setIsCompositionInput] = useState(false)

	const { input, isLoading, stop, handleInputChange, handleSubmit } = useChat({
		id,
	})

	return (
		<form className="sticky bottom-9" onSubmit={handleSubmit}>
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
					<SendMessageButton input={input} isLoading={isLoading} stop={stop} />
				}
			/>
		</form>
	)
}

export default MessageTextarea
