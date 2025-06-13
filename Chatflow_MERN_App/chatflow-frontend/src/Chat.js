
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';

const socket = io('http://localhost:5000');

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return window.location.href = '/login';

    axios.get('http://localhost:5000/conversations', { headers: { Authorization: `Bearer ${token}` } })
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
    const res = await axios.get(`http://localhost:5000/conversations/${convId}/messages`);
    setMessages(res.data);
  };

  const sendMessage = async () => {
    const token = localStorage.getItem('token');
    const resUser = await axios.get('http://localhost:5000/users/me', { headers: { Authorization: `Bearer ${token}` } });
    const newMsg = { senderId: resUser.data._id, content: text };
    const res = await axios.post(`http://localhost:5000/conversations/${conversationId}/messages`, newMsg);
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
