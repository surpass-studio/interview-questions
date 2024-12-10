import { Container, List, UnstyledButton } from '@mantine/core'
import { type Route } from './+types/_index'
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

const HomePage = ({ loaderData }: Route.ComponentProps) => {
	return (
		<Container className="flex-1" size="lg">
			<List size="lg" className="space-y-4">
				{loaderData.issues.map((issue) => (
					<UnstyledButton component={List.Item} key={issue.id}>
						{issue.title}
					</UnstyledButton>
				))}
			</List>
		</Container>
	)
}

export default HomePage
