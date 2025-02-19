import { ActionIcon, Tooltip, Transition } from '@mantine/core'
import { useWindowScroll } from '@mantine/hooks'
import { IconArrowDown } from '@tabler/icons-react'
import { useMemo } from 'react'

const ScrollToBottomButton = () => {
	const [scroll, scrollTo] = useWindowScroll()

	const mounted = useMemo(() => {
		if (typeof window === 'undefined') {
			return false
		}

		return document.body.scrollHeight - window.innerHeight - scroll.y > 64
	}, [scroll.y])

	return (
		<Transition transition="slide-up" mounted={mounted}>
			{(styles) => (
				<Tooltip label="回到底部">
					<ActionIcon
						style={styles}
						radius="xl"
						variant="light"
						onClick={() => scrollTo({ y: document.body.scrollHeight })}
					>
						<IconArrowDown className="stroke-1.5" />
					</ActionIcon>
				</Tooltip>
			)}
		</Transition>
	)
}

export default ScrollToBottomButton
