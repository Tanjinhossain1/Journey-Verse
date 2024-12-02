import { ChatUser } from "@/types/user"
import { MoreVertical, Trash } from 'lucide-react'

interface ChatTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
  users: ChatUser[]
  onDeleteTab: (userId: string) => void
}

export default function ChatTabs({ activeTab, onTabChange, users, onDeleteTab }: ChatTabsProps) {
  return (
    <div className="w-full md:w-1/4 bg-gray-100 dark:bg-gray-800 p-4 overflow-y-auto">
      <div 
        className={`p-2 mb-2 cursor-pointer ${activeTab === "Live Review" ? "bg-blue-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
        onClick={() => onTabChange("Live Review")}
      >
        Live Review
      </div>
      {users.map((user) => (
        <div 
          key={user.id}
          className={`p-2 mb-2 cursor-pointer flex items-center justify-between ${activeTab === user.id ? "bg-blue-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
        >
          <div className="dark:text-white" onClick={() => onTabChange(user.id)}>{user.name}</div>
          <div className="relative group">
            <MoreVertical className="w-4 h-4 cursor-pointer dark:text-white" />
            <div className="absolute right-0 w-32 bg-white dark:bg-gray-700 rounded-md shadow-lg hidden group-hover:block">
              <div
                className="px-4 py-2 text-sm text-red-700 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center cursor-pointer"
                onClick={() => onDeleteTab(user.id)}
              >
                <Trash className="w-4 h-4 mr-2" /> Delete
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

