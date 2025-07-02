import ChatUploadbar from "@/components/Bars/chatUploadbar";
import { Send } from "lucide-react";

export default function DoodlePage() {
  return (
    <div
      className="min-h-screen bg-repeat bg-[#fffbe7] font-sans text-gray-800"
      style={{
        backgroundImage: "url('https://www.toptal.com/designers/subtlepatterns/uploads/doodles.png')",
      }}
    >
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center ">
      
      <div>
        Messages
      </div>

      {/* Fixed Input Bar */}
      {/* <div className="fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-gray-300 px-4 py-3">
        <div className=" flex items-center gap-2 max-w-3xl mx-auto">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button className="p-2 rounded-full bg-pink-400 hover:bg-pink-500 text-white">
            <Send size={20} />
          </button>
        </div>
      </div> */}

        <ChatUploadbar className='absolute z-2' />

    </div>

    </div>
  );
}
