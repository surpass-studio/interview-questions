import { useQueryState } from 'nuqs'
import SEARCH_PARAMS from '@/helpers/SEARCH_PARAMS'

const useChatReasoningToggle = () => {
	const [isReasoningEnabled, setIsReasoningEnabled] = useQueryState(
		'reasoning',
		SEARCH_PARAMS.reasoning,
	)

	const toggleReasoning = () => {
		void setIsReasoningEnabled((value) => !value)
	}

	return { isReasoningEnabled, toggleReasoning }
}

export default useChatReasoningToggle
