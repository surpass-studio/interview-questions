import {
	NavLink as MantineNavlink,
	Box,
	Text,
	Menu,
	Group,
	ActionIcon,
	Stack,
	Title,
} from '@mantine/core'
import { IconDots, IconTrash } from '@tabler/icons-react'
import clsx from 'clsx'
import {
	href,
	useLoaderData,
	useFetcher,
	NavLink,
	useParams,
} from 'react-router'
import { type Info } from '../../routes/chat/+types'
import classes from './ConversationList.module.css'

const ConversationList = () => {
	const { conversations } = useLoaderData<Info['loaderData']>()

	const { conversationId } = useParams<Info['params']>()

	const fetcher = useFetcher()

	if (conversations.length === 0) {
		return (
			<Stack align="center" pt="xl">
				<Title>😉</Title>
				<Text>
					{Date.now() % 2 ? (
						<>
							对话列表空空如也，
							<br />
							连一只猫都没有！
						</>
					) : (
						<>
							对话列表是空的，
							<br />
							但你可以让它变得热闹起来！
						</>
					)}
				</Text>
			</Stack>
		)
	}

	return (
		<Box component="ul">
			{conversations.map((conversation) => (
				<Group key={conversation.id} component="li" className="group relative">
					<MantineNavlink
						component={NavLink}
						classNames={{
							root: clsx('stretched-link', classes.listItem),
							body: 'group-hover:pr-10',
							label: 'whitespace-nowrap',
						}}
						to={href('/chat/:conversationId', {
							conversationId: conversation.id,
						})}
						color="blue"
						title={conversation.title}
						label={conversation.title}
					/>
					<Menu>
						<Menu.Target>
							<ActionIcon
								className="invisible absolute right-3 group-hover:visible"
								radius="lg"
								variant="subtle"
							>
								<IconDots />
							</ActionIcon>
						</Menu.Target>
						<Menu.Dropdown>
							<Menu.Item
								type="submit"
								color="red"
								leftSection={<IconTrash className="size-4" />}
								renderRoot={(props) => (
									<fetcher.Form
										method="delete"
										action={`/api/chat/${conversation.id}`}
									>
										<input
											type="hidden"
											name="redirect"
											value={
												conversation.id === conversationId ? 'true' : 'false'
											}
										/>
										<button {...props} />
									</fetcher.Form>
								)}
							>
								Delete
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</Group>
			))}
		</Box>
	)
}

export default ConversationList
