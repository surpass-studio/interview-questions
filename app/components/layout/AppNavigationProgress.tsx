import { nprogress, NavigationProgress } from '@mantine/nprogress'
import { useEffect } from 'react'
import { useNavigation } from 'react-router'

import '@mantine/nprogress/styles.css'

export const AppNavigationProgress = () => {
	const { location } = useNavigation()

	useEffect(() => {
		location ? nprogress.start() : nprogress.complete()
	}, [location])

	return <NavigationProgress />
}
