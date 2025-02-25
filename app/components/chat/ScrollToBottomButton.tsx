import { ActionIcon, Tooltip, Transition } from '@mantine/core'
import { useWindowEvent } from '@mantine/hooks'
import { IconArrowDown } from '@tabler/icons-react'
import { useState } from 'react'

const ScrollToBottomButton = () => {
	const [mounted, setMounted] = useState(false)

	useWindowEvent('scroll', () => {
		setMounted(
			document.body.scrollHeight - window.innerHeight - window.scrollY > 64,
		)
	})

	return (
		<Transition transition="slide-up" mounted={mounted}>
			{(styles) => (
				<Tooltip label="回到底部">
					<ActionIcon
						style={styles}
						radius="xl"
						variant="light"
						onClick={() =>
							window.scrollTo({
								top: document.body.scrollHeight,
								behavior: 'smooth',
							})
						}
					>
						<IconArrowDown />
					</ActionIcon>
				</Tooltip>
			)}
		</Transition>
	)
}

export default ScrollToBottomButton
