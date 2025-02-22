import { useParams } from 'react-router'
import { type Info } from '../../routes/chat.$conversationId/+types'

const useConversationId = () => {
	const { conversationId } = useParams<Info['params']>()

	return {
		conversationId,
	}
}

export default useConversationId
