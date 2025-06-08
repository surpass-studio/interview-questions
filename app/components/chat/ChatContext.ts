import { type Chat } from '@ai-sdk/react'
import { createContext } from 'react'

const ChatContext = createContext<InstanceType<typeof Chat>>(null!)

export default ChatContext
