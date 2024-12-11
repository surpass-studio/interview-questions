import { Modal, ScrollArea } from '@mantine/core'
import { useLoaderData, useNavigate } from 'react-router'
import { type Info } from '../../routes/question.$number/+types'
import Article from './Article'
import styles from './QuestionModal.module.css'

const QuestionModal = () => {
	const { title, formatedIssueBody } = useLoaderData<Info['loaderData']>()

	const navigate = useNavigate()

	return (
		<Modal
			classNames={{ header: styles.modalHeader }}
			scrollAreaComponent={ScrollArea.Autosize}
			title={title}
			fullScreen
			opened
			onClose={() => {
				void navigate(-1)
			}}
		>
			<Article html={formatedIssueBody} />
		</Modal>
	)
}

export default QuestionModal
