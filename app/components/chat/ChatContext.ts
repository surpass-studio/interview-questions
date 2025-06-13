import { type Chat } from '@ai-sdk/react'
import { createContext } from 'react'

const ChatContext = createContext<Chat<unknown>>(null!)

export default ChatContext
