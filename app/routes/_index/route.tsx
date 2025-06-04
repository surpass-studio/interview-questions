import { Stack } from '@mantine/core'
import LinkHeader from 'http-link-header'
import { type MetaFunction } from 'react-router'
import { type Route } from './+types/route'
import QuestionList from '@/components/question/QuestionList'
import QuestionListPagination from '@/components/question/QuestionListPagination'
import loadSearchParams from '@/helpers/loadSearchParams'

export const meta: MetaFunction = () => {
	return [
		{ title: 'Interview Questions' },
		{
			name: 'description',
			content: '面试题集锦 - 一个帮助开发者准备技术面试的知识库 📚',
		},
	]
}

export const loader = async ({ request, context }: Route.LoaderArgs) => {
	const { label, page, search } = loadSearchParams(request)

	const query: string[] = [
		'repo:pro-collection/interview-question',
		'is:issue',
		'is:open',
	]

	if (label) {
		query.push(`label:"${label}"`)
	}

	if (search) {
		query.push(search)
	}

	const { data, headers } = await context.octokit.request(
		'GET /search/issues',
		{
			q: query.join(' '),
			page,
			per_page: 32,
		},
	)

	let total = 1

	if (headers.link) {
		const link = LinkHeader.parse(headers.link),
			prev = link.rel('prev')[0],
			last = link.rel('last')[0]

		if (last) {
			total = loadSearchParams(last.uri).page
		} else if (prev && loadSearchParams(prev.uri).page === page - 1) {
			total = page
		}
	}

	return {
		questions: data.items,
		pagination: {
			value: page,
			total,
		},
	}
}

const HomePage = () => {
	return (
		<Stack align="center" gap="xl">
			<QuestionList />
			<QuestionListPagination />
		</Stack>
	)
}

export default HomePage
