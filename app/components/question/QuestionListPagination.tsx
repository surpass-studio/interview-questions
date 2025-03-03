import { Pagination } from '@mantine/core'
import { Link, useLoaderData, useSearchParams } from 'react-router'
import { type Info } from '../../routes/+types/_index'
import serialize from '@/helpers/serialize'

const QuestionListPagination = () => {
	const { questions, pagination } = useLoaderData<Info['loaderData']>()

	const [searchParams] = useSearchParams()

	if (questions.length === 0) {
		return null
	}

	return (
		<Pagination
			{...pagination}
			getItemProps={(page) => {
				return {
					component: Link,
					viewTransition: true,
					prefetch: 'intent',
					to: { search: serialize(searchParams, { page }) },
				}
			}}
			getControlProps={(control) => {
				if (control === 'first') {
					return {
						component: Link,
						viewTransition: true,
						prefetch: 'intent',
						to: { search: serialize(searchParams, { page: 1 }) },
					}
				}

				if (control === 'last') {
					return {
						component: Link,
						viewTransition: true,
						prefetch: 'intent',
						to: { search: serialize(searchParams, { page: pagination.total }) },
					}
				}

				if (control === 'next') {
					return {
						component: Link,
						viewTransition: true,
						prefetch: 'intent',
						to: {
							search: serialize(searchParams, { page: pagination.value + 1 }),
						},
					}
				}

				if (control === 'previous') {
					return {
						component: Link,
						viewTransition: true,
						prefetch: 'intent',
						to: {
							search: serialize(searchParams, { page: pagination.value - 1 }),
						},
					}
				}

				return {}
			}}
		/>
	)
}

export default QuestionListPagination
