import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

const GET_MESSAGES = gql`
  query GetMessages {
    messages {
      id
      sender
      text
      timestamp
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation SendMessage($text: String!, $sender: String!) {
    addMessage(input: { text: $text, sender: $sender }) {
      id
      text
      sender
      timestamp
    }
  }
`;

function Chat({ admin }) {
  const [messageInput, setMessageInput] = useState('');
  const { loading, error, data } = useQuery(GET_MESSAGES);
  const [sendMessage] = useMutation(SEND_MESSAGE, {
    refetchQueries: [{ query: GET_MESSAGES }],
  });

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      sendMessage({ variables: { text: messageInput, sender: 'user' } });
      setMessageInput('');
    }
  };

  if (loading) return <p className="text-white text-center py-4">Loading...</p>;
  if (error) return <p className="text-red-500 text-center py-4">Error: {error.message}</p>;

  return (
    <div className="bg-gray-700 p-6 rounded-lg mt-6">
      <h2 className="text-xl font-semibold text-white">Chat with: {admin.name}</h2>
      <div className="my-4 h-64 overflow-y-auto bg-gray-800 p-4 rounded-lg">
        {data.messages.map((message) => (
          <div
            key={message.id}
            className={`${message.sender === 'user' ? 'text-right' : 'text-left'} mb-2`}
          >
            <p
              className={`inline-block p-2 rounded-lg ${
                message.sender === 'user' ? 'bg-green-500' : 'bg-blue-500'
              } text-white`}
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