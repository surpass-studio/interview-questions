import { type UIMessage, type Chat } from '@ai-sdk/react'
import { createContext } from 'react'

const ChatContext = createContext<Chat<UIMessage>>(null!)

export default ChatContext
