import { Container, Stack } from '@mantine/core'
import rehypeShiki from '@shikijs/rehype'
import pMap from 'p-map'
import parseLinkHeader from 'parse-link-header'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { type Route } from './+types/_index'
import IssueList from '@/components/issue/IssueList'
import IssueListPagination from '@/components/issue/IssueListPagination'
import octokit from '@/configs/octokit'

export const loader = async ({ request }: Route.LoaderArgs) => {
	const url = new URL(request.url)

	const page = Number(url.searchParams.get('page')) || 1

	const response = await octokit.issues.listForRepo({
		owner: 'pro-collection',
		repo: 'interview-question',
		page,
		per_page: 20,
	})

	let total = 1

	const links = parseLinkHeader(response.headers.link)

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

	const issues = await pMap(response.data, async (issue) => ({
		...issue,
		formattedBody: issue.body
			? String(
					await unified()
						.use(remarkParse)
						.use(remarkRehype)
						.use(rehypeShiki, {
							theme: 'catppuccin-latte',
						})
						.use(rehypeStringify)
						.process(issue.body),
				)
			: 'No description',
	}))

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
