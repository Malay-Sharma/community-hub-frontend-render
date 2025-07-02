import React, { useEffect, useRef, useState } from 'react';
import { EllipsisVertical, ArrowLeft, Dot, Smile, Plus, Phone, Video, SendHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/authContext';
import { getInitials } from '@/lib/get-initials';
import EmojiPicker from 'emoji-picker-react';

const Messages = () => {
  const { user: currentUser } = useAuth();
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);


  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:4000/api");
      const data = await res.json();
      setAllUsers(data.filter(u => u._id !== currentUser?._id));
    };
    if (currentUser) fetchUsers();
  }, [currentUser]);

  const loadChatHistory = async (chatId) => {
    const res = await fetch(`http://localhost:4000/api/chats/messages/${chatId}`);
    const msgs = await res.json();
    setChatHistory(Array.isArray(msgs) ? msgs : []);
  };

  const handleSelectUser = async (user) => {
    setSelectedUser(user);
    setChatHistory([]);

    try {
      // Try to find existing chat
      const findRes = await fetch(`http://localhost:4000/api/chats/find/${currentUser._id}/${user._id}`);
      if (findRes.ok) {
        const chat = await findRes.json();
        setChatId(chat._id);
        await loadChatHistory(chat._id);
      } else {
        // Create new chat if not found
        const createRes = await fetch(`http://localhost:4000/api/chats/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user1Id: currentUser._id, user2Id: user._id })
        });
        if (!createRes.ok) throw new Error(await createRes.text());
        const newChat = await createRes.json();
        setChatId(newChat._id);
        await loadChatHistory(newChat._id);
      }
    } catch (err) {
      console.error("Error loading chat:", err);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setNewMessage(prev => prev + emojiData.emoji);
  };


  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const res = await fetch(`http://localhost:4000/api/chats/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatId,
          senderId: currentUser._id,
          message: newMessage.trim()
        })
      });
      if (!res.ok) throw new Error(await res.text());
      const msg = await res.json();
      setChatHistory(prev => [...prev, msg]);
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const handleGoBack = () => {
    setSelectedUser(null);
    setChatId(null);
    setChatHistory([]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className={`border-r bg-white flex flex-col w-full md:w-1/4 h-full ${selectedUser ? 'hidden' : 'block'} md:block`}>
        <div className="p-4 font-bold text-blue-600">Connected</div>
        <div className="overflow-y-auto flex-1 space-y-2 p-2">
          {allUsers.map(user => (
            <div key={user._id} className="flex items-center justify-between p-2 rounded hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectUser(user)}>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  {user.avatar || user.photo ? (
                    <AvatarImage src={user.avatar || user.photo} alt={user.name} />
                  ) : (
                    <AvatarFallback>{getInitials(user.name || 'U')}</AvatarFallback>
                  )}
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{user.name || 'Guest'}</span>
                  <span className="text-xs text-gray-500">{user.online ? 'Online' : 'Offline'}</span>
                </div>
              </div>
              <Dot className={`w-4 h-4 ${user.online ? 'text-green-500' : 'text-gray-400'}`} />
            </div>
          ))}
        </div>
      </div>

      <div className={`flex-1 relative bg-white h-full ${selectedUser ? 'block' : 'hidden'} md:block`}>
        {selectedUser ? (
          <>
            <div className="absolute top-0 left-0 right-0 z-10 border-b p-2 bg-white flex items-center justify-between gap-2 md:gap-6">
              <div className='flex items-center gap-2'>
                <Button variant="ghost" size="icon" className="md:hidden" onClick={handleGoBack}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <Avatar className="h-10 w-10">
                  {selectedUser.avatar || selectedUser.photo ? (
                    <AvatarImage src={selectedUser.avatar || selectedUser.photo} alt={selectedUser.name} />
                  ) : (
                    <AvatarFallback>{getInitials(selectedUser.name || 'U')}</AvatarFallback>
                  )}
                </Avatar>
                <p className="font-medium">{selectedUser.email}</p>
              </div>
              <div className='flex items-center gap-2'>
                <Phone />
                <Video />
                <EllipsisVertical />
              </div>
            </div>

            <div className="absolute top-[48px] bottom-[48px] left-0 right-0 overflow-y-auto p-4 flex flex-col space-y-2 scrollbar-hidden"
              style={{ backgroundImage: "url('https://www.toptal.com/designers/subtlepatterns/uploads/doodles.png')" }}>
                {chatHistory.map((msg, idx) => {
                  const isSender = msg.sender === currentUser._id;
                  const time = new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  const date = new Date(msg.createdAt).toDateString();

                  const prevDate = idx > 0 ? new Date(chatHistory[idx - 1].createdAt).toDateString() : null;

                  // Determine date label (Today / Yesterday / date)
                  const todayStr = new Date().toDateString();
                  const yesterdayStr = new Date(Date.now() - 86400000).toDateString();
                  let dateLabel = "";
                  if (date !== prevDate) {
                    if (date === todayStr) {
                      dateLabel = "Today";
                    } else if (date === yesterdayStr) {
                      dateLabel = "Yesterday";
                    } else {
                      dateLabel = new Date(msg.createdAt).toLocaleDateString();
                    }
                  }

                  return (
                    <React.Fragment key={idx}>
                      {dateLabel && (
                        <div className="self-center bg-gray-300 text-xs text-gray-700 rounded px-2 py-1 mb-2">
                          {dateLabel}
                        </div>
                      )}
                      <div
                        className={`max-w-xs p-2 rounded ${
                          isSender ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 self-start'
                        }`}
                      >
                        <div>{msg.message}</div>
                        <div className="flex justify-end items-center gap-1 text-xs opacity-80 mt-1">
                          <span>{time}</span>
                          <span>✔</span>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}


                {/* Dummy element to scroll to */}
                <div ref={messagesEndRef} />
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-10 border-t p-2 bg-gray-100 flex items-center gap-2">
              
                  <Smile className="cursor-pointer" onClick={() => setShowEmojiPicker(prev => !prev)} />
                    
                  <Plus />

                  {showEmojiPicker && (
                    <div className="absolute bottom-14 left-2 z-20">
                      <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        theme="light"
                      />
                    </div>
                  )}


              <input
                className="flex-1 border rounded px-2 py-1 mx-2 bg-white"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button size="icon" variant="ghost" onClick={handleSendMessage}><SendHorizontal /></Button>
            </div>
          </>
        ) : (
          <div className="hidden md:flex items-center justify-center h-full text-gray-400">Start a Conversation</div>
        )}
      </div>
    </div>
  );
};

export default Messages;
