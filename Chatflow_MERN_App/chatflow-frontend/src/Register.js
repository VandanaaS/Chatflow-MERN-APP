
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_API_URL;

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/auth/register`, form);
      toast.success("Registered successfully!");
      window.location.href = '/login';
    } catch (err) {
      toast.error("Registration failed!");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <input className="form-control" name="username" placeholder="Username" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <input className="form-control" name="email" placeholder="Email" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <input className="form-control" name="password" type="password" placeholder="Password" onChange={handleChange} />
        </div>
        <button className="btn btn-success" type="submit">Register</button>
      </form>
    </div>
  );
}
