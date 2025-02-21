import { useChat } from '@ai-sdk/react'
import { type MantineColor, Button, Group, ThemeIcon } from '@mantine/core'
import {
	type Icon,
	IconCloud,
	IconDeviceMobile,
	IconFileTypeCss,
} from '@tabler/icons-react'
import { href, useFetcher } from 'react-router'
import useChatId from './useChatId'
import useChatReasoningToggle from './useChatReasoningToggle'

interface QuickPrompt {
	icon: Icon
	color: MantineColor
	label: string
}

const QuickPromptList = () => {
	const { isReasoningEnabled } = useChatReasoningToggle()

	const { chatId } = useChatId()

	const fetcher = useFetcher()

	const { append } = useChat({
		id: chatId,
		body: {
			sendReasoning: isReasoningEnabled,
		},
	})

	const quickPrompts: QuickPrompt[] = [
		{
			icon: IconCloud,
			color: 'blue',
			label: 'Why is the sky blue?',
		},
		{
			icon: IconDeviceMobile,
			color: 'pink',
			label: 'Mobile-first design principles?',
		},
		{
			icon: IconFileTypeCss,
			color: 'violet',
			label: 'How do I center a div in CSS?',
		},
	]

	return (
		<Group component="ul" justify="center">
			{quickPrompts.map((prompt) => (
				<Button
					key={prompt.label}
					component="li"
					radius="xl"
					variant="default"
					leftSection={
						<ThemeIcon c={prompt.color} size="sm" variant="transparent">
							<prompt.icon className="stroke-1.5 size-full" />
						</ThemeIcon>
					}
					onClick={async () => {
						await fetcher.submit(null, {
							action: href('/chat'),
							method: 'post',
						})

						await append({ role: 'user', content: prompt.label })
					}}
				>
					{prompt.label}
				</Button>
			))}
		</Group>
	)
}

export default QuickPromptList
