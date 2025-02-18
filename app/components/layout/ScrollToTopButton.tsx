import { Transition, Tooltip, ActionIcon } from '@mantine/core'
import { useWindowScroll } from '@mantine/hooks'
import { IconArrowUp } from '@tabler/icons-react'

const ScrollToTopButton = () => {
	const [scroll, scrollTo] = useWindowScroll()

	return (
		<Transition transition="slide-up" mounted={scroll.y > 64}>
			{(styles) => (
				<Tooltip label="回到顶部">
					<ActionIcon
						style={styles}
						size="xl"
						radius="xl"
						variant="light"
						onClick={() => scrollTo({ y: 0 })}
					>
						<IconArrowUp />
					</ActionIcon>
				</Tooltip>
			)}
		</Transition>
	)
}

export default ScrollToTopButton
