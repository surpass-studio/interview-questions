import {
	SignedIn,
	SignedOut,
	UserButton,
	SignInButton,
} from '@clerk/react-router'
import { AppShell, Container, Group, Title, Image, Button } from '@mantine/core'
import { Link, Outlet } from 'react-router'
import SearchInput from '../form/SearchInput'
import styles from './AppLayout.module.css'
import GithubLink from './GithubLink'
import ScrollToTopButton from './ScrollToTopButton'
import ToggleColorSchemeButton from './ToggleColorSchemeButton'

const AppLayout = () => {
	return (
		<AppShell header={{ height: 56 }}>
			<AppShell.Header>
				<Container className="h-full" size="lg">
					<Group className="h-full" justify="space-between" align="center">
						<Group gap="sm" renderRoot={(props) => <Link to="/" {...props} />}>
							<Image src="/logo.png" alt="logo" className="size-8" />
							<Title order={2}>Interview Questions</Title>
						</Group>
						<Group gap="xl" visibleFrom="md">
							<SearchInput />
							<Group gap="xs">
								<ToggleColorSchemeButton />
								<GithubLink />
								<SignedOut>
									<SignInButton>
										<Button variant="subtle">Sign in</Button>
									</SignInButton>
								</SignedOut>
								<SignedIn>
									<UserButton />
								</SignedIn>
							</Group>
						</Group>
					</Group>
				</Container>
			</AppShell.Header>
			<AppShell.Main className={styles.main}>
				<Container className="w-full" size="md" py="lg">
					<Outlet />
				</Container>
			</AppShell.Main>
			<ScrollToTopButton />
		</AppShell>
	)
}

export default AppLayout
