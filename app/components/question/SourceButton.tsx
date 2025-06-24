import { ActionIcon, Tooltip } from '@mantine/core'
import { LinkSimpleIcon } from '@phosphor-icons/react'
import { useParams } from 'react-router'
import { type Route } from '../../routes/questions.$questionId/+types/route'

const SourceButton = () => {
	const { questionId } = useParams<Route.ComponentProps['params']>()

	return (
		<Tooltip label="题目来源">
			<ActionIcon
				component="a"
				href={`https://github.com/pro-collection/interview-question/issues/${questionId}`}
				target="_blank"
				size="lg"
				variant="light"
			>
				<LinkSimpleIcon className="size-6" />
			</ActionIcon>
		</Tooltip>
	)
}

export default SourceButton
