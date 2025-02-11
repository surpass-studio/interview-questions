import { useChat } from '@ai-sdk/react'
import { Paper, Textarea } from '@mantine/core'
import { useState } from 'react'

interface MessageTextareaProps {
	id: string
}

const MessageTextarea = ({ id }: MessageTextareaProps) => {
	const [isCompositionInput, setIsCompositionInput] = useState(false)

	const { input, handleInputChange, handleSubmit } = useChat({
		id,
	})

	return (
		<Paper className="sticky bottom-6">
			<form onSubmit={handleSubmit}>
				<Textarea
					autosize
					minRows={2}
					maxRows={8}
					size="lg"
					placeholder="Type a message..."
					value={input}
					onChange={handleInputChange}
					onCompositionStart={() => setIsCompositionInput(true)}
					onCompositionEnd={() => setIsCompositionInput(false)}
					onKeyDown={(event) => {
						if (
							event.key === 'Enter' &&
							!event.shiftKey &&
							!isCompositionInput
						) {
							event.preventDefault()

							handleSubmit()
						}
					}}
				/>
			</form>
		</Paper>
	)
}

export default MessageTextarea
