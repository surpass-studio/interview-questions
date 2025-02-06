import { ActionIcon, Anchor, Tooltip } from '@mantine/core'
import { IconBrandGithub } from '@tabler/icons-react'

const GithubLink = () => {
	return (
		<Tooltip label="GitHub repository">
			<Anchor
				href="https://github.com/surpass-studio/interview-questions"
				target="_blank"
			>
				<ActionIcon color="gray" variant="subtle" size="lg">
					<IconBrandGithub className="stroke-1.5" />
				</ActionIcon>
			</Anchor>
		</Tooltip>
	)
}

export default GithubLink
