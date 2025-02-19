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
import { Link, useLoaderData } from 'react-router'
import { type Info } from '../../routes/+types/_index'
import classes from './QuestionList.module.css'
import serialize from '@/helpers/serialize'

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
						className={classes.listItem}
					>
						<Link
							viewTransition
							prefetch="intent"
							to={`/question/${issue.number}`}
							className={clsx('align-middle', classes.stretchedLink)}
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
										pathname: '/',
										search: serialize({ label: label.name as string }),
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
