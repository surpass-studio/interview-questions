import { Container, Stack, Title, Text, Anchor, Paper } from '@mantine/core'
import { type Route } from './+types/index'
import Article from '@/components/question/Article'
import marked from '@/configs/marked'
import octokit from '@/configs/octokit'

export const loader = async ({ params }: Route.LoaderArgs) => {
	const { data: issue } = await octokit.issues.get({
		owner: 'pro-collection',
		repo: 'interview-question',
		issue_number: Number(params.number),
	})

	const title = issue.title

	const formatedIssueBody = issue.body
		? await marked.parse(issue.body, { async: true, gfm: true })
		: 'No description'

	return { title, formatedIssueBody }
}

const IssuePage = ({ loaderData, params }: Route.ComponentProps) => {
	const { title, formatedIssueBody } = loaderData

	return (
		<Container size="md" p={0}>
			<Paper p="lg">
				<Stack className="w-full" gap="xl">
					<Stack>
						<Title order={2}>{title}</Title>
						<Text>
							题目来源：
							<Anchor
								href={`https://github.com/pro-collection/interview-question/issues/${params.number}`}
							>
								pro-collection/interview-question
							</Anchor>
						</Text>
					</Stack>
					<Article html={formatedIssueBody} />
				</Stack>
			</Paper>
		</Container>
	)
}

export default IssuePage
