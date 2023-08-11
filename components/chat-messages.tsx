'use client'

import { Companion, Message } from "@prisma/client"
import { ChatMessage } from "./chat-message";

interface ChatMessagesProps {
  companion: Companion[];
  messages: any[];
  isLoading: boolean;
}

export const ChatMessages = ({
  companion,
  messages = [],
  isLoading
}: ChatMessagesProps) => {
  return (
    <div className='flex-1 overflow-y-auto pr-4'>
      <ChatMessage 
        src={companion.src}
        role='system'
        content={`Hello, I am ${companion.name}, ${companion.description}`}
      />
      <ChatMessage 
        src={companion.src}
        role='user'
        content={`Hello, I am Rafa`}
      />
    </div>
  )
}