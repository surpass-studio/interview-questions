import { parseAsBoolean, useQueryState } from 'nuqs'

const useChatReasoningToggle = () => {
	const [isReasoningEnabled, setIsReasoningEnabled] = useQueryState(
		'reasoning',
		parseAsBoolean.withDefault(true),
	)

	const toggleReasoning = () => {
		void setIsReasoningEnabled((value) => !value)
	}

	return { isReasoningEnabled, toggleReasoning }
}

export default useChatReasoningToggle
