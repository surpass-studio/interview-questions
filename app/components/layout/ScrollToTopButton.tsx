import { Transition, Tooltip, ActionIcon } from '@mantine/core'
import { useWindowScroll } from '@mantine/hooks'
import { ArrowUpIcon } from '@phosphor-icons/react'

const ScrollToTopButton = () => {
	const [scroll, scrollTo] = useWindowScroll()

	return (
		<Transition transition="slide-up" mounted={scroll.y > 64}>
			{(styles) => (
				<Tooltip label="回到顶部">
					<ActionIcon
						style={styles}
						size="xl"
						variant="light"
						onClick={() => scrollTo({ y: 0 })}
					>
						<ArrowUpIcon className="size-6" />
					</ActionIcon>
				</Tooltip>
			)}
		</Transition>
	)
}

export default ScrollToTopButton
