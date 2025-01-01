import React, { useState } from 'react';

function Chat({ admin }) {
  const [messages, setMessages] = useState([
    { sender: 'admin', text: `Hello! How can I assist you today?` },
  ]);
  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessages([
        ...messages,
        { sender: 'user', text: `You: ${messageInput}` },
      ]);
      setMessageInput('');
    }
  };

  return (
    <div className="bg-gray-700 p-6 rounded-lg mt-6">
      <h2 className="text-xl font-semibold text-white">Chat with: {admin.name}</h2>
      <div className="my-4 h-64 overflow-y-auto bg-gray-800 p-4 rounded-lg">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${
              message.sender === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <p
              className={`${
                message.sender === 'user' ? 'text-green-400' : 'text-blue-400'
              }`}
            >
              {message.text}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          className="flex-1 p-3 rounded-lg bg-gray-600 text-white"
          placeholder="Type your message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 p-3 rounded-lg bg-blue-500 text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;