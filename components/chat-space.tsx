"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type Message = {
  id: number
  user: string
  content: string
  isAdmin: boolean
}

const initialMessages: Message[] = [
  { id: 1, user: 'Admin', content: 'Welcome to the Smartsoil community chat! Share your experiences and ask questions.', isAdmin: true },
  { id: 2, user: 'John Doe', content: "Hi everyone! I&apos;ve just started implementing cover cropping. Any tips?", isAdmin: false },
  { id: 3, user: 'Admin', content: "Great question, John! We&apos;ll be hosting a webinar on cover cropping next week. Stay tuned for details!", isAdmin: true },
]

export function ChatSpace() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        user: 'You',
        content: newMessage.trim(),
        isAdmin: false,
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

  return (
    <Card className="w-full h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-800 dark:text-green-100">Community Chat</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full">
          {messages.map((message) => (
            <div key={message.id} className={`flex items-start space-x-2 mb-4 ${message.isAdmin ? 'justify-start' : 'justify-end'}`}>
              {message.isAdmin && (
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/admin-avatar.png" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              )}
              <div className={`rounded-lg p-3 max-w-[70%] ${message.isAdmin ? 'bg-blue-100 dark:bg-blue-800' : 'bg-green-100 dark:bg-green-800'}`}>
                <p className="font-semibold text-sm">{message.user}</p>
                <p className="text-sm">{message.content}</p>
              </div>
              {!message.isAdmin && (
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/user-avatar.png" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit">Send</Button>
        </form>
      </CardFooter>
    </Card>
  )
}

