import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
	auth: import.meta.env.GITHUB_TOKEN,
})

export default octokit
