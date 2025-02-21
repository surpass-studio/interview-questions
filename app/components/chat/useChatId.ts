import { useParams } from 'react-router'
import { type Info } from '../../routes/chat.$chatId/+types/index'

const useChatId = () => {
	const { chatId } = useParams<Info['params']>()

	return {
		chatId,
	}
}

export default useChatId
