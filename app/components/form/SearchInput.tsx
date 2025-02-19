import { Pill, PillsInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { useQueryState } from 'nuqs'
import { Form } from 'react-router'
import SEARCH_PARAMS from '@/helpers/SEARCH_PARAMS'

const SearchInput = () => {
	const [label, setLabel] = useQueryState('label', SEARCH_PARAMS.label)

	const [search] = useQueryState('search', SEARCH_PARAMS.search)

	return (
		<Form action="/" method="get">
			<PillsInput leftSection={<IconSearch className="stroke-1.5 size-4" />}>
				<Pill.Group>
					{label && (
						<Pill withRemoveButton onRemove={() => setLabel(null, {})}>
							{label}
						</Pill>
					)}
					<PillsInput.Field
						name="search"
						placeholder="Type Something..."
						defaultValue={search}
					/>
				</Pill.Group>
			</PillsInput>
			{label && <input name="label" value={label} hidden />}
			<button type="submit" hidden />
		</Form>
	)
}

export default SearchInput
