import { useLocalStorage } from '@mantine/hooks'
import CHAT_CONSTANTS from './CHAT_CONSTANTS'

const useChatReasoningToggle = (getInitialValueInEffect?: boolean) => {
	const [isReasoningEnabled, setIsReasoningEnabled] = useLocalStorage({
		key: CHAT_CONSTANTS.STORAGE_KEY.REASONING_ENABLED,
		sync: false,
		defaultValue: true,
		getInitialValueInEffect,
	})

	const toggleReasoning = () => setIsReasoningEnabled((value) => !value)

	return { isReasoningEnabled, toggleReasoning }
}

export default useChatReasoningToggle
