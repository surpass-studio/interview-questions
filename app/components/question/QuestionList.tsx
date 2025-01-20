import {
	List,
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

const QuestionList = () => {
	const { issues } = useLoaderData<Info['loaderData']>()

	if (issues.length === 0) {
		return (
			<Stack className="h-80" justify="center" align="center" gap="xl">
				<Title order={2}>No question found.</Title>
				<Button component={Link} to="/" variant="subtle">
					返回首页
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
							className="align-middle"
						>
							{issue.title}
						</Link>
						<Group display="inline-flex" ml="xs">
							{issue.labels.map((label, index) => (
								<Button
									key={index}
									component={Link}
									size="compact-xs"
									autoContrast
									color={label.color ? `#${label.color}` : undefined}
									to={{
										search: queryString.stringify({ label: label.name }),
									}}
								>
									{label.name}
								</Button>
							))}
						</Group>
					</UnstyledButton>
				))}
			</List>
		</Paper>
	)
}

export default QuestionList
