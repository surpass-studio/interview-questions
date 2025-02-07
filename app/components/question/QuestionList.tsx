import {
	List,
	Group,
	Stack,
	Title,
	Paper,
	Button,
	UnstyledButton,
} from '@mantine/core'
import clsx from 'clsx'
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
						p="sm"
						title={issue.title}
						className={styles.listItem}
					>
						<Link
							viewTransition
							prefetch="intent"
							to={`/question/${issue.number}`}
							className={clsx('align-middle', styles.stretchedLink)}
						>
							{issue.title}
						</Link>
						<Group display="inline-flex" ml="xs">
							{issue.labels.map((label, index) => (
								<Button
									key={index}
									component={Link}
									className="z-1"
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
