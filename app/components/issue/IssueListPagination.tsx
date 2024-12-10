import { Pagination } from '@mantine/core'
import { Link, useLoaderData } from 'react-router'
import { type Info } from '../../routes/+types/_index'

const IssueListPagination = () => {
	const { pagination } = useLoaderData<Info['loaderData']>()

	return (
		<Pagination
			{...pagination}
			getItemProps={(page) => {
				const searchParams = new URLSearchParams({ page: String(page) })

				return { component: Link, to: { search: searchParams.toString() } }
			}}
			getControlProps={(control) => {
				const searchParams = new URLSearchParams()

				if (control === 'first') {
					searchParams.set('page', String(1))

					return { component: Link, to: { search: searchParams.toString() } }
				}

				if (control === 'last') {
					searchParams.set('page', String(pagination.total))

					return { component: Link, to: { search: searchParams.toString() } }
				}

				if (control === 'next') {
					searchParams.set('page', String(pagination.value + 1))

					return { component: Link, to: { search: searchParams.toString() } }
				}

				if (control === 'previous') {
					searchParams.set('page', String(pagination.value - 1))

					return { component: Link, to: { search: searchParams.toString() } }
				}

				return {}
			}}
		/>
	)
}

export default IssueListPagination
