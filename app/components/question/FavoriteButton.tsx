import { SignInButton, useAuth } from '@clerk/react-router'
import { Tooltip, ActionIcon } from '@mantine/core'
import { IconHeart, IconHeartFilled } from '@tabler/icons-react'
import { useLoaderData, useFetcher, useParams } from 'react-router'
import { type Info } from '../../routes/question.$questionId/+types'

const FavoriteButton = () => {
	const { questionId } = useParams<Info['params']>()

	const { isFavorited } = useLoaderData<Info['loaderData']>()

	const { userId } = useAuth()

	const fetcher = useFetcher()

	const loading = fetcher.state !== 'idle'

	if (!userId) {
		return (
			<Tooltip label="登录后即可收藏">
				<SignInButton>
					<ActionIcon color="red" size="lg" radius="lg" variant="light">
						<IconHeart className="stroke-1.5" />
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
					<ActionIcon
						type="submit"
						color="red"
						size="lg"
						radius="lg"
						loading={loading}
					>
						<IconHeartFilled className="stroke-1.5" />
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
					radius="lg"
					variant="light"
					loading={loading}
				>
					<IconHeart className="stroke-1.5" />
				</ActionIcon>
			</fetcher.Form>
		</Tooltip>
	)
}

export default FavoriteButton
