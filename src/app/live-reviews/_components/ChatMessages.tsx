import { useState, useRef, useEffect } from "react";
import { Message } from "@/types/Message";
import { ChatUser } from "@/types/user";
import { MoreVertical, Edit, Trash } from "lucide-react";
import Image from "next/image";

const isValidImageUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    return /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(parsedUrl.pathname);
  } catch {
    return false;
  }
};

interface ChatMessagesProps {
  messages: Message[];
  currentUser: ChatUser;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  onDelete: (messageId: string) => void;
  onUpdate: (messageId: string, updatedMessage: string) => void;
  newMessage: string;
  setNewMessage: (message: string) => void;
  sendMessage: () => void;
  onUserAvatarClick: (userId: string, userName: string) => void;
  activeTab: string;
  isLoading: boolean;
}

export default function ChatMessages({
  messages,
  currentUser,
  onScroll,
  onDelete,
  onUpdate,
  newMessage,
  setNewMessage,
  sendMessage,
  onUserAvatarClick,
  activeTab,
  isLoading,
}: ChatMessagesProps) {
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editedMessage, setEditedMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleEdit = (messageId: string, currentMessage: string) => {
    setEditingMessageId(messageId);
    setEditedMessage(currentMessage);
  };

  const handleUpdate = (messageId: string) => {
    onUpdate(messageId, editedMessage);
    setEditingMessageId(null);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 w-full">
      <div className="flex-1 overflow-y-auto p-4" onScroll={onScroll}>
        {isLoading ? (
          <div className="flex flex-col space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-end min-h-full">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-4 flex items-start ${
                  msg.sender === currentUser.id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {msg.sender !== currentUser.id && (
                  <div
                    className="w-10 h-10 rounded-full overflow-hidden mr-2 flex-shrink-0 cursor-pointer"
                    onClick={() =>
                      activeTab === "Live Review" &&
                      msg.sender !== currentUser.id &&
                      onUserAvatarClick(msg.sender, msg.senderName)
                    }
                  >
                    {msg.senderImage ? (
                      msg.senderImage && isValidImageUrl(msg.senderImage) ? (
                        <Image
                          src={msg.senderImage}
                          alt={msg.senderName}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-lg font-semibold">
                          {msg.senderName[0]?.toUpperCase()}
                        </div>
                      )
                    ) : (
                      <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-lg font-semibold">
                        {msg.senderName[0].toUpperCase()}
                      </div>
                    )}
                  </div>
                )}
                <div
                  className={`flex-1 ${
                    msg.sender === currentUser.id ? "text-right" : "text-left"
                  }`}
                >
                  <div className="font-bold text-gray-900 dark:text-gray-100">
                    {msg.senderName}
                  </div>
                  {editingMessageId === msg.id ? (
                    <div>
                      <input
                        type="text"
                        value={editedMessage}
                        onChange={(e) => setEditedMessage(e.target.value)}
                        className="border p-1 rounded w-full dark:bg-gray-800 dark:text-white"
                      />
                      <button
                        onClick={() => handleUpdate(msg.id)}
                        className="text-blue-500 mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingMessageId(null)}
                        className="text-gray-500 dark:text-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`flex items-center ${
                        msg.sender === currentUser.id
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <p
                        className={`text-gray-800 dark:text-gray-200 ${
                          msg.sender === currentUser.id
                            ? "bg-blue-100 dark:bg-blue-900"
                            : "bg-gray-100 dark:bg-gray-800"
                        } rounded-lg p-2 inline-block`}
                      >
                        {msg.message}
                      </p>
                      {msg.sender === currentUser.id && (
                        <div className="relative ml-2 group">
                          <MoreVertical className="w-4 h-4 cursor-pointer text-gray-500 dark:text-gray-400" />
                          <div className="absolute right-0 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg hidden group-hover:block">
                            <div
                              className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center cursor-pointer"
                              onClick={() => handleEdit(msg.id, msg.message)}
                            >
                              <Edit className="w-4 h-4 mr-2" /> Edit
                            </div>
                            <div
                              className="px-4 py-2 text-sm text-red-700 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center cursor-pointer"
                              onClick={() => onDelete(msg.id)}
                            >
                              <Trash className="w-4 h-4 mr-2" /> Delete
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      <div className="p-4 border-t dark:border-gray-700">
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 border p-2 rounded-l dark:bg-gray-800 dark:text-white dark:border-gray-600"
            placeholder="Type your message"
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
