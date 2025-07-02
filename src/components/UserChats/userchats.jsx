import React from 'react'

const Userchats = () => {
  return (
    <div className="p-4 space-y-3 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent px-2">
      <div className="flex justify-start">
        <div className="bg-gray-200 p-2 rounded-xl max-w-xs">Hey, how are you?</div>
      </div>
      <div className="flex justify-end">
        <div className="bg-blue-500 text-white p-2 rounded-xl max-w-xs">I'm good, you?</div>
      </div>
      {/* Add more messages as needed */}
    </div>
  )
}

export default Userchats
