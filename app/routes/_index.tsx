import { Container, Group, Stack } from '@mantine/core'
import parseLinkHeader from 'parse-link-header'
import { type Route } from './+types/_index'
import SearchInput from '@/components/form/SearchInput'
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

		const links = parseLinkHeader(headers.link)

		if (links) {
			if (links.last) {
				total = Number(links.last.page) || 1
			} else if (links.prev && Number(links.prev.page) === page - 1) {
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

	const links = parseLinkHeader(headers.link)

	if (links) {
		if (links.last) {
			total = Number(links.last.page) || 1
		} else if (links.prev && Number(links.prev.page) === page - 1) {
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
				<Group className="ml-auto">
					<SearchInput />
				</Group>
				<QuestionList />
				<QuestionListPagination />
			</Stack>
		</Container>
	)
}

export default HomePage
