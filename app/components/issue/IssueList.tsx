import { Card, List, UnstyledButton } from '@mantine/core'
import { useLoaderData } from 'react-router'
import { type Info } from '../../routes/+types/_index'
import styles from './issueList.module.css'

const IssueList = () => {
	const { issues } = useLoaderData<Info['loaderData']>()

	return (
		<Card padding={0}>
			<List size="lg">
				{issues.map((issue) => (
					<UnstyledButton
						key={issue.id}
						component={List.Item}
						title={issue.title}
						className={styles.listItem}
						py="sm"
						px="xs"
					>
						{issue.title}
					</UnstyledButton>
				))}
			</List>
		</Card>
	)
}

export default IssueList
