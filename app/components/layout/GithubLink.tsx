import { ActionIcon, Anchor, Tooltip } from '@mantine/core'
import { GithubLogoIcon } from '@phosphor-icons/react'

const GithubLink = () => {
	return (
		<Tooltip label="GitHub repository">
			<Anchor
				href="https://github.com/surpass-studio/interview-questions"
				target="_blank"
			>
				<ActionIcon color="gray" variant="subtle" size="lg">
					<GithubLogoIcon className="size-6" />
				</ActionIcon>
			</Anchor>
		</Tooltip>
	)
}

export default GithubLink
