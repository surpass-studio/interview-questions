import { parseAsInteger, parseAsString, parseAsBoolean } from 'nuqs'

const SEARCH_PARAMS = {
	label: parseAsString.withOptions({ shallow: false }),
	search: parseAsString.withDefault(''),
	page: parseAsInteger.withDefault(1),
	reasoning: parseAsBoolean.withDefault(true),
}

export default SEARCH_PARAMS
