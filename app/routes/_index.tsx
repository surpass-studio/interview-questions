import { Container, Stack } from '@mantine/core'
import { micromark } from 'micromark'
import { gfmHtml, gfm } from 'micromark-extension-gfm'
import parseLinkHeader from 'parse-link-header'
import { type Route } from './+types/_index'
import IssueList from '@/components/issue/IssueList'
import IssueListPagination from '@/components/issue/IssueListPagination'
import octokit from '@/configs/octokit'

export const loader = async ({ request }: Route.LoaderArgs) => {
	const url = new URL(request.url)

	const page = Number(url.searchParams.get('page')) || 1

	const { data: issues, headers } = await octokit.issues.listForRepo({
		owner: 'pro-collection',
		repo: 'interview-question',
		page,
		per_page: 20,
	})

	for (const issue of issues) {
		issue.body = issue.body
			? micromark(issue.body, {
					extensions: [gfm()],
					htmlExtensions: [gfmHtml()],
				})
			: 'No description'
	}

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
			<Stack align="center">
				<IssueList />
				<IssueListPagination />
			</Stack>
		</Container>
	)
}

export default HomePage
