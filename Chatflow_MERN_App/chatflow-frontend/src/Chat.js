
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const API_URL = process.env.REACT_APP_API_URL;
const socket = io(API_URL);

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return window.location.href = '/login';

    axios.get(`${API_URL}/conversations`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        if (res.data.length > 0) {
          setConversationId(res.data[0]._id);
          loadMessages(res.data[0]._id);
          socket.emit('join', res.data[0]._id);
        }
      });

    socket.on('newMessage', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off('newMessage');
    }
  }, []);

  const loadMessages = async (convId) => {
    const res = await axios.get(`${API_URL}/conversations/${convId}/messages`);
    setMessages(res.data);
  };

  const sendMessage = async () => {
    const token = localStorage.getItem('token');
    const resUser = await axios.get(`${API_URL}/users/me`, { headers: { Authorization: `Bearer ${token}` } });
    const newMsg = { senderId: resUser.data._id, content: text };
    const res = await axios.post(`${API_URL}/conversations/${conversationId}/messages`, newMsg);
    socket.emit('sendMessage', res.data);
    setText('');
  };

  return (
    <div className="container mt-5">
      <h2>Chat</h2>
      <div className="border p-3 mb-3" style={{ height: '300px', overflowY: 'scroll' }}>
        {messages.map(msg => <div key={msg._id}>{msg.content}</div>)}
      </div>
      <div className="input-group">
        <input className="form-control" value={text} onChange={(e) => setText(e.target.value)} />
        <button className="btn btn-primary" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
