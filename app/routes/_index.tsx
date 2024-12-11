import { Container, Stack } from '@mantine/core'
import LinkHeader from 'http-link-header'
import { type Route } from './+types/_index'
import QuestionList from '@/components/question/QuestionList'
import QuestionListPagination from '@/components/question/QuestionListPagination'
import octokit from '@/configs/octokit'

export const loader = async ({ request }: Route.LoaderArgs) => {
	const url = new URL(request.url)

	const page = Number(url.searchParams.get('page')) || 1

	const search = url.searchParams.get('search')

	if (search) {
		const { data, headers } = await octokit.search.issuesAndPullRequests({
			q: `repo:pro-collection/interview-question is:issue is:open ${search}`,
		})

		let total = 1

		if (headers.link) {
			const link = LinkHeader.parse(headers.link),
				prev = link.rel('prev')[0],
				last = link.rel('last')[0]

			if (last) {
				const page = new URL(last.uri).searchParams.get('page')

				total = Number(page) || 1
			} else if (
				prev &&
				Number(new URL(prev.uri).searchParams.get('page')) === page - 1
			) {
				total = page
			}
		}

		return {
			issues: data.items,
			pagination: {
				value: page,
				total,
			},
		}
	}

	const { data: issues, headers } = await octokit.issues.listForRepo({
		owner: 'pro-collection',
		repo: 'interview-question',
		page,
		per_page: 20,
	})

	let total = 1

	if (headers.link) {
		const link = LinkHeader.parse(headers.link),
			prev = link.rel('prev')[0],
			last = link.rel('last')[0]

		if (last) {
			const page = new URL(last.uri).searchParams.get('page')

			total = Number(page) || 1
		} else if (
			prev &&
			Number(new URL(prev.uri).searchParams.get('page')) === page - 1
		) {
			total = page
		}
	}

	const pagination = {
		value: page,
		total,
	}

	return {
		issues,
		pagination,
	}
}

const HomePage = () => {
	return (
		<Container className="flex-1" size="lg">
			<Stack align="center" gap="xl" py="xl">
				<QuestionList />
				<QuestionListPagination />
			</Stack>
		</Container>
	)
}

export default HomePage
