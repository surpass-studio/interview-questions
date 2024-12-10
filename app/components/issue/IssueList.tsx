import {
	Card,
	List,
	Text,
	Badge,
	Group,
	Container,
	ScrollArea,
	UnstyledButton,
} from '@mantine/core'
import { modals } from '@mantine/modals'
import { useLoaderData } from 'react-router'
import { type Info } from '../../routes/+types/_index'
import styles from './issueList.module.css'

const IssueLabel = Badge.withProps({
	styles: { root: { textTransform: 'none' } },
})

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
						<Text span className="align-middle">
							{issue.title}
						</Text>
						<Group display="inline-flex" ml="xs">
							{issue.labels.map((label, index) =>
								typeof label === 'string' ? (
									<IssueLabel key={index}>{label}</IssueLabel>
								) : (
									<IssueLabel
										key={index}
										autoContrast
										color={label.color ? `#${label.color}` : undefined}
									>
										{label.name}
									</IssueLabel>
								),
							)}
						</Group>
					</UnstyledButton>
				))}
			</List>
		</Card>
	)
}

export default IssueList
