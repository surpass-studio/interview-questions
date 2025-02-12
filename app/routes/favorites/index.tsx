import { getAuth } from '@clerk/react-router/ssr.server'
import { Stack } from '@mantine/core'
import { eq } from 'drizzle-orm'
import { type Route } from './+types/index'
import QuestionList from '@/components/question/QuestionList'
import QuestionListPagination from '@/components/question/QuestionListPagination'
import getOctokit from '@/configs/octokit'
import getDB from '@/db/getDB'
import { userFavorites } from '@/db/schema'

export const meta = () => {
	return [{ title: '收藏夹' }]
}

export const loader = async (args: Route.LoaderArgs) => {
	const { userId } = await getAuth(args)

	if (userId) {
		const db = getDB(args.context.cloudflare.env.DB)

		const url = new URL(args.request.url)

		const page = Number(url.searchParams.get('page')) || 1

		const PAGE_SIZE = 32

		const count = await db.$count(
			userFavorites,
			eq(userFavorites.user_id, userId as string),
		)

		if (count === 0) {
			return {
				issues: [],
				pagination: {
					value: 0,
					total: 0,
				},
			}
		}

		const total = Math.ceil(count / PAGE_SIZE)

		const questionIds = await db.query.userFavorites.findMany({
			where: eq(userFavorites.user_id, userId as string),
			columns: { question_id: true },
			limit: PAGE_SIZE,
			offset: (page - 1) * PAGE_SIZE,
		})

		const query: string[] = [
			'repo:pro-collection/interview-question',
			'is:issue',
			'is:open',
			questionIds.map(({ question_id }) => question_id).join(' '),
		]

		const label = url.searchParams.get('label')

		if (label) {
			query.push(`label:"${label}"`)
		}

		const search = url.searchParams.get('search')

		if (search) {
			query.push(search)
		}

		const { data } = await getOctokit(
			args.context,
		).search.issuesAndPullRequests({
			q: query.join(' '),
			page: 1,
			per_page: PAGE_SIZE,
		})

		return {
			issues: data.items,
			pagination: {
				value: page,
				total,
			},
		}
	}

	return {
		issues: [],
		pagination: {
			value: 0,
			total: 0,
		},
	}
}

const FavoritesPage = () => {
	return (
		<Stack align="center" gap="xl">
			<QuestionList />
			<QuestionListPagination />
		</Stack>
	)
}

export default FavoritesPage
