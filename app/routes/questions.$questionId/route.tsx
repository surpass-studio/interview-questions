import { getAuth } from '@clerk/react-router/ssr.server'
import { Stack, Title, Paper, Affix, Button, Group } from '@mantine/core'
import { and, eq } from 'drizzle-orm'
import { Link, type MetaDescriptor } from 'react-router'
import { type Route } from './+types/route'
import ScrollToTopButton from '@/components/layout/ScrollToTopButton'
import Article from '@/components/question/Article'
import FavoriteButton from '@/components/question/FavoriteButton'
import FullTextCopyButton from '@/components/question/FullTextCopyButton'
import SourceButton from '@/components/question/SourceButton'
import * as schema from '@/db/schema'
import serialize from '@/helpers/serialize'

export const meta = ({ data }: Route.MetaArgs) => {
	return [
		{ title: data ? data.title : 'Interview Question' },
	] satisfies MetaDescriptor[]
}

export const loader = async (args: Route.LoaderArgs) => {
	const questionId = Number(args.params.questionId)

	const { data: issue } = await args.context.octokit.issues.get({
		owner: 'pro-collection',
		repo: 'interview-question',
		issue_number: questionId,
		mediaType: { format: 'full' },
	})

	const { userId } = await getAuth(args)

	let isFavorited = false

	if (userId) {
		const favorite = await args.context.db.query.userFavorites.findFirst({
			where: and(
				eq(schema.userFavorites.user_id, userId),
				eq(schema.userFavorites.question_id, questionId),
			),
		})

		isFavorited = !!favorite
	}

	return {
		title: issue.title,
		labels: issue.labels,
		body_text: issue.body_text,
		body_html: issue.body_html,
		isFavorited,
	}
}

const QuestionPage = ({ loaderData }: Route.ComponentProps) => {
	const { title, labels, body_text, body_html } = loaderData

	return (
		<Paper p="lg">
			<Stack className="w-full" gap="xl">
				<Stack gap="lg">
					<Title order={3}>{title}</Title>
					<Group gap="lg">
						{labels.map((label, index) => (
							<Button
								key={index}
								component={Link}
								className="z-1"
								size="compact-xs"
								autoContrast
								color={
									typeof label !== 'string' && label.color
										? `#${label.color}`
										: undefined
								}
								to={{
									pathname: '/',
									search: serialize({
										label:
											typeof label === 'string'
												? label
												: (label.name as string),
									}),
								}}
							>
								{typeof label === 'string' ? label : label.name}
							</Button>
						))}
					</Group>
					<Group gap="lg">
						<FavoriteButton />
						{body_text && <FullTextCopyButton text={body_text} />}
						<SourceButton />
					</Group>
				</Stack>
				<Article html={body_html ?? 'No description'} />
			</Stack>
			<Affix position={{ bottom: '12%', right: '8%' }}>
				<ScrollToTopButton />
			</Affix>
		</Paper>
	)
}

export default QuestionPage
