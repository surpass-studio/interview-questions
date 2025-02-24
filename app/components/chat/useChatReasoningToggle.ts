import { useLocalStorage } from '@mantine/hooks'
import CHAT_CONSTANTS from './CHAT_CONSTANTS'

const useChatReasoningToggle = () => {
	const [isReasoningEnabled, setIsReasoningEnabled] = useLocalStorage({
		key: CHAT_CONSTANTS.STORAGE_KEY.REASONING_ENABLED,
		sync: false,
		defaultValue: true,
	})

	const toggleReasoning = () => setIsReasoningEnabled((value) => !value)

	return { isReasoningEnabled, toggleReasoning }
}

export default useChatReasoningToggle
