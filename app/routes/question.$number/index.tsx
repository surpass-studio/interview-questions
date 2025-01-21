import { Stack, Title, Text, Anchor, Paper } from '@mantine/core'
import { type MetaDescriptor } from 'react-router'
import { type Route } from './+types/index'
import Article from '@/components/question/Article'
import octokit from '@/configs/octokit'

export const meta = ({ data }: Route.MetaArgs) => {
	return [{ title: data.title }] satisfies MetaDescriptor[]
}

export const loader = async ({ params }: Route.LoaderArgs) => {
	const { data: issue } = await octokit.issues.get({
		owner: 'pro-collection',
		repo: 'interview-question',
		issue_number: Number(params.number),
		mediaType: { format: 'html' },
	})

	return { title: issue.title, body_html: issue.body_html }
}

const IssuePage = ({ loaderData, params }: Route.ComponentProps) => {
	const { title, body_html } = loaderData

	return (
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
				<Article html={body_html ?? 'No description'} />
			</Stack>
		</Paper>
	)
}

export default IssuePage
