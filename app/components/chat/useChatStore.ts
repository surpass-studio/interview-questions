import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const CHAT_STORE_PERSIST_STORAGE_NAME = 'CHAT_STORE'

interface ChatStoreState {
	isReasoningEnabled: boolean
	toggleReasoning: () => void
}

const useChatStore = create(
	persist<ChatStoreState>(
		(set) => ({
			isReasoningEnabled: false,
			toggleReasoning: () =>
				set((state) => ({ isReasoningEnabled: !state.isReasoningEnabled })),
		}),
		{
			name: CHAT_STORE_PERSIST_STORAGE_NAME,
		},
	),
)

export default useChatStore
