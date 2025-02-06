import { SignInButton, useAuth } from '@clerk/react-router'
import { Tooltip, ActionIcon } from '@mantine/core'
import { IconCarambola, IconCarambolaFilled } from '@tabler/icons-react'
import { useLoaderData, useFetcher, useParams } from 'react-router'
import { type Info } from '../../routes/question.$number/+types'

const FavoriteButton = () => {
	const { number: questionId } = useParams<Info['params']>()

	const { isFavorited } = useLoaderData<Info['loaderData']>()

	const { userId } = useAuth()

	const fetcher = useFetcher()

	const loading = fetcher.state !== 'idle'

	if (!userId) {
		return (
			<Tooltip label="请登录后收藏">
				<SignInButton>
					<ActionIcon size="xl" radius="xl" variant="default">
						<IconCarambola />
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
					<ActionIcon type="submit" size="xl" radius="xl" loading={loading}>
						<IconCarambolaFilled />
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
					size="xl"
					radius="xl"
					variant="default"
					loading={loading}
				>
					<IconCarambola />
				</ActionIcon>
			</fetcher.Form>
		</Tooltip>
	)
}

export default FavoriteButton
