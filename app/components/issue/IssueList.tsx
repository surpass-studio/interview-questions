import {
	Card,
	List,
	Container,
	ScrollArea,
	UnstyledButton,
} from '@mantine/core'
import { modals } from '@mantine/modals'
import { useLoaderData } from 'react-router'
import { type Info } from '../../routes/+types/_index'
import styles from './issueList.module.css'

const IssueList = () => {
	const { issues } = useLoaderData<Info['loaderData']>()

	const openIssueModal = (issue: (typeof issues)[number]) => {
		modals.open({
			title: issue.title,
			fullScreen: true,
			scrollAreaComponent: ScrollArea.Autosize,
			classNames: { header: styles.modalHeader },
			children: (
				<Container py="xl">
					<article
						className="prose max-w-full"
						dangerouslySetInnerHTML={{ __html: issue.formattedBody }}
					/>
				</Container>
			),
		})
	}

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
						onClick={() => openIssueModal(issue)}
					>
						{issue.title}
					</UnstyledButton>
				))}
			</List>
		</Card>
	)
}

export default IssueList
