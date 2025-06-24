import { SignInButton, useAuth } from '@clerk/react-router'
import { Tooltip, ActionIcon } from '@mantine/core'
import { HeartIcon } from '@phosphor-icons/react'
import { useLoaderData, useFetcher, useParams } from 'react-router'
import { type Route } from '../../routes/questions.$questionId/+types/route'

const FavoriteButton = () => {
	const { questionId } = useParams<Route.ComponentProps['params']>()

	const { isFavorited } = useLoaderData<Route.ComponentProps['loaderData']>()

	const { userId } = useAuth()

	const fetcher = useFetcher()

	const loading = fetcher.state !== 'idle'

	if (!userId) {
		return (
			<Tooltip label="登录后即可收藏">
				<SignInButton>
					<ActionIcon color="red" size="lg" variant="light">
						<HeartIcon className="size-6" />
					</ActionIcon>
				</SignInButton>
			</Tooltip>
		)
	}

	if (isFavorited) {
		return (
			<Tooltip label="取消收藏">
				<fetcher.Form method="delete" action={`/api/favorites/${questionId}`}>
					<input type="hidden" name="questionId" value={questionId} />
					<ActionIcon type="submit" color="red" size="lg" loading={loading}>
						<HeartIcon className="size-6" weight="fill" />
					</ActionIcon>
				</fetcher.Form>
			</Tooltip>
		)
	}

	return (
		<Tooltip label="收藏">
			<fetcher.Form method="post" action="/api/favorites">
				<input type="hidden" name="questionId" value={questionId} />
				<ActionIcon
					type="submit"
					color="red"
					size="lg"
					variant="light"
					loading={loading}
				>
					<HeartIcon className="size-6" />
				</ActionIcon>
			</fetcher.Form>
		</Tooltip>
	)
}

export default FavoriteButton
