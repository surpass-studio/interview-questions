import { Container } from '@mantine/core'
import rehypeShiki from '@shikijs/rehype'
import pMap from 'p-map'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { type Route } from './+types/_index'
import IssueList from '@/components/issue/IssueList'
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
	}
}

const HomePage = () => {
	return (
		<Container className="flex-1" size="lg">
			<IssueList />
		</Container>
	)
}

export default HomePage
