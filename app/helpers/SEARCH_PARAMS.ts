import { parseAsInteger, parseAsString } from 'nuqs'

const SEARCH_PARAMS = {
	label: parseAsString.withOptions({ shallow: false }),
	search: parseAsString.withDefault(''),
	page: parseAsInteger.withDefault(1),
}

export default SEARCH_PARAMS
