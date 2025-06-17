import { Container, Flex, Group, Loader, Textarea } from '@mantine/core'
import { useInputState } from '@mantine/hooks'
import { useFetcher } from 'react-router'
import chatSchema from './chatSchema'
import classes from './ConversationForm.module.css'
import SendMessageButton from './SendMessageButton'

const StartConversationForm = () => {
	const fetcher = useFetcher()

	const isPending =
		fetcher.state === 'loading' || fetcher.state === 'submitting'

	const [input, handleInputChange] = useInputState('')

	const isInputValid = chatSchema.input.safeParse(input).success

	return (
		<Container className="w-full">
			<fetcher.Form method="post" action="/api/chat/create">
				<Textarea
					name="content"
					autosize
					minRows={1}
					rows={1}
					maxRows={10}
					size="md"
					placeholder="Type a message..."
					classNames={{ wrapper: 'flex-1', input: classes.textarea }}
					value={input}
					onChange={handleInputChange}
					onKeyDown={async (event) => {
						const isEnterKeyPressed =
							event.key === 'Enter' &&
							!event.shiftKey &&
							!event.nativeEvent.isComposing

						const canSendMessage =
							fetcher.state === 'idle' && isEnterKeyPressed && isInputValid

						if (canSendMessage) {
							event.preventDefault()

							const form = (event.target as HTMLElement).closest('form')

							await fetcher.submit(form)
						}
					}}
					inputContainer={(children) => (
						<Flex className={classes.textareaContainer}>
							{children}
							<Group className={classes.submitButtonContainer}>
								{isPending ? (
									<Loader size="28" />
								) : (
									<SendMessageButton isInputValid={isInputValid} />
								)}
							</Group>
						</Flex>
					)}
				/>
			</fetcher.Form>
		</Container>
	)
}

export default StartConversationForm
