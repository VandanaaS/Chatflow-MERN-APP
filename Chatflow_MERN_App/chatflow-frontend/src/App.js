// This code is the main entry point for the ChatFlow application.
// It sets up the React Router for navigation between different components like Login, Register, Chat, and UserList.
// It also includes a Logout button that clears the user's token from local storage and navigates them back to the login page.
// The ToastContainer is used to display notifications for actions like successful login or logout.
// The application uses Bootstrap for styling and react-toastify for notifications.
// The LogoutButton component handles the logout functionality, clearing the token and showing a success message.
// The App component renders the main layout, including the header with the application title and the logout button.
// The Routes component defines the different paths and their corresponding components.
// The application is styled using Bootstrap and includes a toast notification system for user feedback.
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Chat from './Chat';
import UserList from './UserList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success("Logged out successfully");
    navigate('/login');
  };

  return (
    <button className="btn btn-outline-danger ms-3" onClick={handleLogout}>
      Logout
    </button>
  );
}

function App() {
  return (
    <Router>
      <div className="container mt-3 d-flex justify-content-between">
        <h3>ChatFlow</h3>
        <LogoutButton />
      </div>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Chat />} />
        <Route path="/users" element={<UserList />} />
      </Routes>

      <ToastContainer />
    </Router>
  );
}

export default App;
