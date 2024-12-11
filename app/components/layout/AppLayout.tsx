import { AppShell, Container, Group, Title, Image } from '@mantine/core'
import { Link, Outlet } from 'react-router'
import SearchInput from '../form/SearchInput'
import styles from './AppLayout.module.css'
import GithubLink from './GithubLink'

const AppLayout = () => {
	return (
		<AppShell padding="md" header={{ height: 56 }}>
			<AppShell.Header>
				<Container className="h-full" size="lg">
					<Group className="h-full" justify="space-between" align="center">
						<Group component={Link} gap="sm">
							<Image src="/logo.png" alt="logo" className="size-8" />
							<Title order={2}>Interview Questions</Title>
						</Group>
						<Group gap="xl">
							<SearchInput />
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
