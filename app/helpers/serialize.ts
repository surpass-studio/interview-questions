import { createSerializer } from 'nuqs'
import SEARCH_PARAMS from './SEARCH_PARAMS'

const serialize = createSerializer(SEARCH_PARAMS)

export default serialize
