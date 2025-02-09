import { ActionIcon, Tooltip } from '@mantine/core'
import { IconLink } from '@tabler/icons-react'
import { useParams } from 'react-router'
import { type Info } from '../../routes/question.$questionId/+types'

const SourceButton = () => {
	const { questionId } = useParams<Info['params']>()

	return (
		<Tooltip label="题目来源">
			<ActionIcon
				component="a"
				href={`https://github.com/pro-collection/interview-question/issues/${questionId}`}
				target="_blank"
				size="lg"
				radius="lg"
				variant="light"
			>
				<IconLink className="stroke-1.5" />
			</ActionIcon>
		</Tooltip>
	)
}

export default SourceButton
