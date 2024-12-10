import { Container } from '@mantine/core'
import { type Route } from './+types/_index'
import IssueList from '@/components/issue/IssueList'
import octokit from '@/configs/octokit'

export const loader = async ({ request }: Route.LoaderArgs) => {
	const url = new URL(request.url)

	const page = Number(url.searchParams.get('page')) || 1

	const { data: issues } = await octokit.issues.listForRepo({
		owner: 'pro-collection',
		repo: 'interview-question',
		page,
		per_page: 10,
	})

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
