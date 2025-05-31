import { ActionIcon, Tooltip, Transition } from '@mantine/core'
import { IconArrowDown } from '@tabler/icons-react'
import { type StickToBottomInstance } from 'use-stick-to-bottom'

type ScrollToBottomButtonProps = Pick<
	StickToBottomInstance,
	'isAtBottom' | 'scrollToBottom'
>

const ScrollToBottomButton = ({
	isAtBottom,
	scrollToBottom,
}: ScrollToBottomButtonProps) => {
	return (
		<Transition transition="slide-up" mounted={!isAtBottom}>
			{(styles) => (
				<Tooltip label="回到底部">
					<ActionIcon
						style={styles}
						variant="light"
						onClick={() => {
							void scrollToBottom()
						}}
					>
						<IconArrowDown />
					</ActionIcon>
				</Tooltip>
			)}
		</Transition>
	)
}

export default ScrollToBottomButton
