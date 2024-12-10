import { AppShell, Container, Group, Title } from '@mantine/core'
import { Outlet } from 'react-router'
import styles from './AppLayout.module.css'
import GithubLink from './GithubLink'

const AppLayout = () => {
	return (
		<AppShell padding="md" header={{ height: 56 }}>
			<AppShell.Header>
				<Container className="h-full" size="xl">
					<Group className="h-full" justify="space-between" align="center">
						<Title order={2}>Interview Questions</Title>
						<Group>
							<GithubLink />
						</Group>
					</Group>
				</Container>
			</AppShell.Header>
			<AppShell.Main className={styles.main}>
				<Outlet />
			</AppShell.Main>
		</AppShell>
	)
}

export default AppLayout
