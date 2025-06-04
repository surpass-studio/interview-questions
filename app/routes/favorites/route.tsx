import { getAuth } from '@clerk/react-router/ssr.server'
import { Button, Stack, Title, Text } from '@mantine/core'
import { eq } from 'drizzle-orm'
import { Link } from 'react-router'
import { type Route } from './+types/route'
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
				questions: [],
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

		const { data } = await args.context.octokit.request('GET /search/issues', {
			q: query.join(' '),
			page: 1,
			per_page: PAGE_SIZE,
		})

		return {
			questions: data.items,
			pagination: {
				value: page,
				total,
			},
		}
	}

	return {
		questions: [],
		pagination: {
			value: 0,
			total: 0,
		},
	}
}

const FavoritesPage = ({ loaderData }: Route.ComponentProps) => {
	if (loaderData.questions.length === 0) {
		return (
			<Stack className="h-4/5" justify="center" align="center">
				<Title>⭐️</Title>
				<Text ta="center">
					收藏夹是空的，
					<br />
					您可以通过点击❤️图标将问题添加到收藏夹中~
				</Text>
				<Button component={Link} to="/" variant="subtle">
					浏览问题
				</Button>
			</Stack>
		)
	}

	return (
		<Stack align="center" gap="xl">
			<QuestionList />
			<QuestionListPagination />
		</Stack>
	)
}

export default FavoritesPage
