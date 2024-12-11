import { marked } from 'marked'
import { type Route } from './+types/index'
import QuestionModal from '@/components/question/QuestionModal'
import octokit from '@/configs/octokit'

export const loader = async ({ params }: Route.LoaderArgs) => {
	const { data: issue } = await octokit.issues.get({
		owner: 'pro-collection',
		repo: 'interview-question',
		issue_number: Number(params.number),
	})

	const title = issue.title

	const formatedIssueBody = issue.body
		? await marked.parse(issue.body, { async: true, gfm: true })
		: 'No description'

	return { title, formatedIssueBody }
}

const IssuePage = () => {
	return <QuestionModal />
}

export default IssuePage
