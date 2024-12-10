import { AppShell, Group, Title } from '@mantine/core'
import { Outlet } from 'react-router'
import styles from './AppLayout.module.css'

const AppLayout = () => {
	return (
		<AppShell padding="md" header={{ height: 64 }}>
			<AppShell.Header>
				<Group className="h-full" align="center" px="xl">
					<Title>ACME</Title>
				</Group>
			</AppShell.Header>
			<AppShell.Main className={styles.main}>
				<Outlet />
			</AppShell.Main>
		</AppShell>
	)
}

export default AppLayout
