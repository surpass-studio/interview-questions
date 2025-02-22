import { useChat } from '@ai-sdk/react'
import { useWindowEvent } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import useConversationId from './useConversationId'

const useChatAutoScroll = () => {
	const { conversationId } = useConversationId()

	const { status, messages } = useChat({ id: conversationId })

	const [shouldAutoScroll, setShouldAutoScroll] = useState(true)
	const [touchStartY, setTouchStartY] = useState(0)
	const [lastScrollTop, setLastScrollTop] = useState(0)

	const checkScrollPosition = () => {
		const { scrollHeight, clientHeight, scrollTop } =
			window.document.documentElement
		const maxScrollHeight = scrollHeight - clientHeight
		const scrollThreshold = maxScrollHeight / 2

		if (scrollTop < lastScrollTop) {
			setShouldAutoScroll(false)
		} else if (maxScrollHeight - scrollTop <= scrollThreshold) {
			setShouldAutoScroll(true)
		}

		setLastScrollTop(scrollTop)
	}

	useWindowEvent('wheel', (event: WheelEvent) => {
		event.deltaY < 0 ? setShouldAutoScroll(false) : checkScrollPosition()
	})

	useWindowEvent('touchstart', (event: TouchEvent) => {
		if (event.touches[0]) {
			setTouchStartY(event.touches[0].clientY)
		}
	})

	useWindowEvent('touchmove', (event: TouchEvent) => {
		if (event.touches[0]) {
			const touchEndY = event.touches[0].clientY
			const deltaY = touchStartY - touchEndY

			deltaY < 0 ? setShouldAutoScroll(false) : checkScrollPosition()

			setTouchStartY(touchEndY)
		}
	})

	useEffect(() => {
		if (status === 'submitted') {
			setShouldAutoScroll(true)
		}
	}, [status])

	useEffect(() => {
		if (shouldAutoScroll) {
			window.scrollTo({
				top: window.document.documentElement.scrollHeight,
				behavior: 'smooth',
			})
		}
	}, [shouldAutoScroll, messages])
}

export default useChatAutoScroll
