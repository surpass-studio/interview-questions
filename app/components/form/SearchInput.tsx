import { TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { Form, useSearchParams } from 'react-router'

const SearchInput = () => {
	const [searchParams] = useSearchParams()

	return (
		<Form action="/" method="get">
			<TextInput
				type="search"
				name="search"
				placeholder="Type Something..."
				defaultValue={searchParams.get('search') ?? ''}
				leftSection={<IconSearch className="stroke-1.5 size-4" />}
			/>
			<button type="submit" hidden />
		</Form>
	)
}

export default SearchInput
