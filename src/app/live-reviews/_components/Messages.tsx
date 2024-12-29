'use client'

import { useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"
import { Message } from "@/types/Message"
import { ChatUser } from "@/types/user"
import ChatMessages from "./ChatMessages"
import ChatTabs from "./ChatTabs"

const socket: Socket = io(process.env.NEXT_PUBLIC_SOCKET_URL)

interface ChatPageProps {
  user: {
    email: string;
    name: string;
    image?: string;
  }
}

export default function ChatPage({ user }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState<string>("")
  const [offset, setOffset] = useState<number>(0)
  const [activeTab, setActiveTab] = useState<string>("Live Review")
  const [users, setUsers] = useState<ChatUser[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const currentUser: ChatUser = { id: user.email, name: user.name, email: user.email, image: user.image }
  const limit = 20 // Messages to fetch per scroll

  useEffect(() => {
    // Fetch initial messages for Live Review
    fetchMessages("Live Review")

    // Fetch user tabs from local storage
    const storedUsers = localStorage.getItem('chatUsers')
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers))
    }

    socket.on("messages_fetched", (fetchedMessages: Message[]) => {
      setMessages(fetchedMessages)
      setIsLoading(false)
    })

    socket.on("new_message", (message: Message) => {
      if (activeTab === "Live Review" || message.sender === currentUser.id || message.recipient === currentUser.id) {
        setMessages((prev) => [...prev, message])
      }
      updateUserTabs(message)
    })

    socket.on("message_deleted", ({ messageId }: { messageId: string }) => {
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId))
    })

    socket.on("message_updated", ({ messageId, newMessage }: { messageId: string; newMessage: string }) => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === messageId ? { ...msg, message: newMessage } : msg))
      )
    })

    return () => {
      socket.off("messages_fetched")
      socket.off("new_message")
      socket.off("message_deleted")
      socket.off("message_updated")
    }
  }, [])

  const updateUserTabs = (message: Message) => {
    const otherUser = message.sender === currentUser.id ? message.recipient : message.sender
    const otherUserName = message.sender === currentUser.id ? message.recipient : message.senderName

    setUsers((prev) => {
      const updatedUsers = prev.some(user => user.id === otherUser)
        ? prev
        : [...prev, { id: otherUser, name: otherUserName, email: otherUser, image: message.senderImage }]
      
      localStorage.setItem('chatUsers', JSON.stringify(updatedUsers))
      return updatedUsers
    })
  }

  const fetchMessages = (recipient: string) => {
    setIsLoading(true)
    socket.emit("fetch_messages", { recipient, sender: currentUser.id, offset: 0, limit })
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      const recipient = activeTab === "Live Review" ? "Live Review" : activeTab
      socket.emit("send_message", { 
        sender: currentUser.id, 
        senderName: currentUser.name, 
        senderImage: currentUser.image,
        recipient: recipient,
        message: newMessage 
      })
      setNewMessage("")
      updateUserTabs({ sender: currentUser.id, recipient, senderName: currentUser.name } as Message)
    }
  }

  const deleteMessage = (messageId: string) => {
    socket.emit("delete_message", { messageId })
  }

  const updateMessage = (messageId: string, updatedMessage: string) => {
    socket.emit("update_message", { messageId, newMessage: updatedMessage })
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    if (target.scrollTop === 0) {
      setOffset((prev) => prev + limit)
      socket.emit("fetch_messages", { recipient: activeTab, sender: currentUser.id, offset: offset + limit, limit })
    }
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setOffset(0)
    setMessages([])
    fetchMessages(tab)
  }

  const handleUserAvatarClick = (userId: string, userName: string) => {
  if (userId === currentUser.id) return; // Don't open a tab for the current user
  if (!users.some(user => user.id === userId)) {
    const newUser = { id: userId, name: userName, email: userId }
    setUsers(prev => {
      const updatedUsers = [...prev, newUser]
      localStorage.setItem('chatUsers', JSON.stringify(updatedUsers))
      return updatedUsers
    })
  }
  handleTabChange(userId)
}

  const deleteTab = (userId: string) => {
    setUsers(prev => {
      const updatedUsers = prev.filter(user => user.id !== userId)
      localStorage.setItem('chatUsers', JSON.stringify(updatedUsers))
      return updatedUsers
    })
    if (activeTab === userId) {
      handleTabChange("Live Review")
    }
  }

  return (
    <div className={`min-h-screen flex flex-col md:flex-row w-full`}>
      <ChatTabs
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        users={users}
        onDeleteTab={deleteTab}
      />
      <ChatMessages
        messages={messages}
        currentUser={currentUser}
        onScroll={handleScroll}
        onDelete={deleteMessage}
        onUpdate={updateMessage}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        sendMessage={sendMessage}
        onUserAvatarClick={handleUserAvatarClick}
        activeTab={activeTab}
        isLoading={isLoading}
      />
    </div>
  )
}

