import { type MantineColor, Button, Group, ThemeIcon } from '@mantine/core'
import {
	type Icon,
	IconCloud,
	IconDeviceMobile,
	IconFileTypeCss,
} from '@tabler/icons-react'
import { useFetcher } from 'react-router'

interface QuickPrompt {
	icon: Icon
	color: MantineColor
	content: string
}

const QuickPromptList = () => {
	const fetcher = useFetcher()

	const quickPrompts: QuickPrompt[] = [
		{
			icon: IconCloud,
			color: 'blue',
			content: 'Why is the sky blue?',
		},
		{
			icon: IconDeviceMobile,
			color: 'pink',
			content: 'Mobile-first design principles?',
		},
		{
			icon: IconFileTypeCss,
			color: 'violet',
			content: 'How do I center a div in CSS?',
		},
	]

	return (
		<Group justify="center">
			{quickPrompts.map((prompt) => (
				<fetcher.Form
					key={prompt.content}
					method="post"
					action="/api/chat/create"
				>
					<input type="hidden" name="content" value={prompt.content} />
					<Button
						type="submit"
						radius="xl"
						variant="default"
						leftSection={
							<ThemeIcon c={prompt.color} size="sm" variant="transparent">
								<prompt.icon className="size-full" />
							</ThemeIcon>
						}
					>
						{prompt.content}
					</Button>
				</fetcher.Form>
			))}
		</Group>
	)
}

export default QuickPromptList
