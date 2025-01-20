import { Pagination } from '@mantine/core'
import { Link, useLoaderData, useSearchParams } from 'react-router'
import { type Info } from '../../routes/+types/_index'

const QuestionListPagination = () => {
	const { issues, pagination } = useLoaderData<Info['loaderData']>()

	const [searchParams] = useSearchParams()

	if (issues.length === 0) {
		return null
	}

	return (
		<Pagination
			{...pagination}
			getItemProps={(page) => {
				const urlSearchParams = new URLSearchParams(searchParams)

				urlSearchParams.set('page', String(page))

				return {
					component: Link,
					viewTransition: true,
					prefetch: 'intent',
					to: { search: urlSearchParams.toString() },
				}
			}}
			getControlProps={(control) => {
				const urlSearchParams = new URLSearchParams()

				if (control === 'first') {
					urlSearchParams.set('page', String(1))

					return {
						component: Link,
						viewTransition: true,
						prefetch: 'intent',
						to: { search: urlSearchParams.toString() },
					}
				}

				if (control === 'last') {
					urlSearchParams.set('page', String(pagination.total))

					return {
						component: Link,
						viewTransition: true,
						prefetch: 'intent',
						to: { search: urlSearchParams.toString() },
					}
				}

				if (control === 'next') {
					urlSearchParams.set('page', String(pagination.value + 1))

					return {
						component: Link,
						viewTransition: true,
						prefetch: 'intent',
						to: { search: urlSearchParams.toString() },
					}
				}

				if (control === 'previous') {
					urlSearchParams.set('page', String(pagination.value - 1))

					return {
						component: Link,
						viewTransition: true,
						prefetch: 'intent',
						to: { search: urlSearchParams.toString() },
					}
				}

				return {}
			}}
		/>
	)
}

export default QuestionListPagination
