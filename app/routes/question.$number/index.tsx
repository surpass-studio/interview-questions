import { getAuth } from '@clerk/react-router/ssr.server'
import { Stack, Title, Text, Anchor, Paper, Affix } from '@mantine/core'
import { and, eq } from 'drizzle-orm'
import { type MetaDescriptor } from 'react-router'
import { type Route } from './+types/index'
import ScrollToTopButton from '@/components/layout/ScrollToTopButton'
import Article from '@/components/question/Article'
import FavoriteButton from '@/components/question/FavoriteButton'
import octokit from '@/configs/octokit'
import getDB from '@/db/getDB'
import { userFavorites } from '@/db/schema'

export const meta = ({ data }: Route.MetaArgs) => {
	return [{ title: data.title }] satisfies MetaDescriptor[]
}

export const loader = async (args: Route.LoaderArgs) => {
	const questionId = Number(args.params.number)

	const { data: issue } = await octokit.issues.get({
		owner: 'pro-collection',
		repo: 'interview-question',
		issue_number: questionId,
		mediaType: { format: 'html' },
	})

	const { userId } = await getAuth(args)

	let isFavorited = false

	if (userId) {
		const db = getDB(args.context.cloudflare.env.DB)

		const favorite = await db.query.userFavorites.findFirst({
			where: and(
				eq(userFavorites.user_id, userId as string),
				eq(userFavorites.question_id, questionId),
			),
		})

		isFavorited = !!favorite
	}

	return { title: issue.title, body_html: issue.body_html, isFavorited }
}

const IssuePage = ({ loaderData, params }: Route.ComponentProps) => {
	const { title, body_html } = loaderData

	return (
		<Paper p="lg">
			<Stack className="w-full" gap="xl">
				<Stack>
					<Title order={3}>{title}</Title>
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
			<Affix position={{ bottom: 128, right: 128 }}>
				<Stack>
					<ScrollToTopButton />
					<FavoriteButton />
				</Stack>
			</Affix>
		</Paper>
	)
}

export default IssuePage
