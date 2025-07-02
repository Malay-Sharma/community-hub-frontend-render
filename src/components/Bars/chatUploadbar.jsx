import {
  Send,
  Mic,
  Image,
  Smile,
} from 'lucide-react'
import React, { useState } from 'react'

const ChatUploadbar = () => {
  const [text, setText] = useState('')

  return (
    <section className="p-3 border-t bg-white">
      <div className="flex items-center border rounded-full px-4 py-2 bg-gray-100">
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 outline-none bg-transparent"
        />
        {text ? (
          <Send className="text-blue-500 cursor-pointer" />
        ) : (
          <div className="flex gap-3 text-gray-500">
            <Mic className="cursor-pointer" />
            <Image className="cursor-pointer" />
            <Smile className="cursor-pointer" />
          </div>
        )}
      </div>
    </section>
  )
}

export default ChatUploadbar
