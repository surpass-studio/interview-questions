import { Affix, Transition, Tooltip, ActionIcon } from '@mantine/core'
import { useWindowScroll } from '@mantine/hooks'
import { IconArrowUp } from '@tabler/icons-react'

const ScrollToTopButton = () => {
	const [scroll, scrollTo] = useWindowScroll()

	return (
		<Affix position={{ bottom: 64, right: 128 }}>
			<Transition transition="slide-up" mounted={scroll.y > 64}>
				{(style) => (
					<Tooltip label="回到顶部">
						<ActionIcon
							style={style}
							size="xl"
							radius="xl"
							onClick={() => scrollTo({ y: 0 })}
						>
							<IconArrowUp />
						</ActionIcon>
					</Tooltip>
				)}
			</Transition>
		</Affix>
	)
}

export default ScrollToTopButton
