import { Octokit } from '@octokit/rest'
import { type AppLoadContext } from 'react-router'

const getOctokit = (context: AppLoadContext) =>
	new Octokit({
		auth: context.cloudflare.env.GITHUB_TOKEN,
	})

export default getOctokit
