import {
	List,
	Text,
	Badge,
	Group,
	Stack,
	Title,
	Paper,
	Button,
	UnstyledButton,
} from '@mantine/core'
import queryString from 'query-string'
import { Link, useLoaderData } from 'react-router'
import { type Info } from '../../routes/+types/_index'
import styles from './QuestionList.module.css'

const QuestionLabel = Badge.withProps({
	styles: { root: { textTransform: 'none' } },
})

const QuestionList = () => {
	const { issues } = useLoaderData<Info['loaderData']>()

	if (issues.length === 0) {
		return (
			<Stack className="h-80" justify="center" align="center" gap="xl">
				<Title order={2}>No question found.</Title>
				<Button component={Link} to="/" variant="subtle">
					Back to home
				</Button>
			</Stack>
		)
	}

	return (
		<Paper className="w-full">
			<List size="lg">
				{issues.map((issue) => (
					<UnstyledButton
						key={issue.number}
						component="li"
						title={issue.title}
						className={styles.listItem}
						py="sm"
						px="xs"
					>
						<Link
							viewTransition
							prefetch="intent"
							to={`/question/${issue.number}`}
						>
							<Text span className="align-middle">
								{issue.title}
							</Text>
						</Link>
						<Group display="inline-flex" ml="xs">
							{issue.labels.map((label, index) => (
								<Link
									key={index}
									to={{
										search: queryString.stringify({ label: label.name }),
									}}
								>
									<QuestionLabel
										autoContrast
										color={label.color ? `#${label.color}` : undefined}
									>
										{label.name}
									</QuestionLabel>
								</Link>
							))}
						</Group>
					</UnstyledButton>
				))}
			</List>
		</Paper>
	)
}

export default QuestionList
