import { Video, Phone, ChevronLeft } from 'lucide-react'
import React from 'react'

const ChatHeader = () => {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b shadow-sm">
      <div className="flex items-center gap-2">
        <ChevronLeft className="w-5 h-5" />
        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="rounded-full w-8 h-8"
        />
        <div>
          <h2 className="text-sm font-medium">username</h2>
          <p className="text-xs text-gray-500">Active 5m ago</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Video className="w-5 h-5" />
        <Phone className="w-5 h-5" />
      </div>
    </div>
  )
}

export default ChatHeader
