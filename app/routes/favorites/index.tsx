import { getAuth } from '@clerk/react-router/ssr.server'
import { Stack } from '@mantine/core'
import { eq } from 'drizzle-orm'
import { type Route } from './+types/index'
import QuestionList from '@/components/question/QuestionList'
import QuestionListPagination from '@/components/question/QuestionListPagination'
import { userFavorites } from '@/db/schema'
import loadSearchParams from '@/helpers/loadSearchParams'

export const meta = () => {
	return [{ title: '收藏夹' }]
}

export const loader = async (args: Route.LoaderArgs) => {
	const { userId } = await getAuth(args)

	if (userId) {
		const PAGE_SIZE = 32

		const count = await args.context.db.$count(
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

		const { page, label, search } = loadSearchParams(args.request)

		const questionIds = await args.context.db.query.userFavorites.findMany({
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

		if (label) {
			query.push(`label:"${label}"`)
		}

		if (search) {
			query.push(search)
		}

		const { data } = await args.context.octokit.search.issuesAndPullRequests({
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
