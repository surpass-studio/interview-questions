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
						<IconHeart />
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
						<IconHeartFilled />
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
					<IconHeart />
				</ActionIcon>
			</fetcher.Form>
		</Tooltip>
	)
}

export default FavoriteButton
