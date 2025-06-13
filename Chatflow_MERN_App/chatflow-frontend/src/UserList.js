
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL;

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${API_URL}/users`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const startConversation = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${API_URL}/conversations`, 
        { participants: [userId] }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.href = '/';
    } catch (err) {
      toast.error('Failed to start conversation');
    }
  };

  return (
    <div className="container mt-5">
      <h2>All Users</h2>
      <ul className="list-group">
        {users.map(user => (
          <li key={user._id} className="list-group-item d-flex justify-content-between">
            <span>{user.username} - {user.email}</span>
            <button className="btn btn-sm btn-primary" onClick={() => startConversation(user._id)}>Chat</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
