import { Button } from '@mantine/core'
import { IconAtom } from '@tabler/icons-react'
import useChatReasoningToggle from './useChatReasoningToggle'

const ToggleReasoningButton = () => {
	const { isReasoningEnabled, toggleReasoning } = useChatReasoningToggle()

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
