import { Button } from '@mantine/core'
import { IconAtom } from '@tabler/icons-react'
import useChatStore from './useChatStore'

const ToggleReasoningButton = () => {
	const isReasoningEnabled = useChatStore((state) => state.isReasoningEnabled),
		toggleReasoning = useChatStore((state) => state.toggleReasoning)

	return (
		<Button
			color={isReasoningEnabled ? undefined : 'gray'}
			size="compact-sm"
			radius="lg"
			variant="light"
			leftSection={<IconAtom className="size-5" />}
			onClick={() => toggleReasoning()}
		>
			Reasoning
		</Button>
	)
}

export default ToggleReasoningButton
