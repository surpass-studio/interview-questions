import { TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { Form } from 'react-router'

const SearchInput = () => {
	return (
		<Form action="/" method="get">
			<TextInput
				type="search"
				name="search"
				label="Search"
				placeholder="Search"
				leftSection={<IconSearch className="stroke-1.5 size-4" />}
			/>
			<button type="submit" hidden />
		</Form>
	)
}

export default SearchInput
