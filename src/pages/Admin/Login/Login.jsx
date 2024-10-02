import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Admin_LoginPopUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Login API call
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.success) {
        // Store user info in sessionStorage
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('firstname', data.firstname); // Store firstname
        sessionStorage.setItem('lastname', data.lastname);   // Store lastname
        sessionStorage.setItem('email', data.email);
        sessionStorage.setItem('usertype', data.usertype);
        sessionStorage.setItem('token', data.token);         // If token is provided by backend

        // Redirect based on user role
        if (data.usertype === 'Admin') {
          navigate('/admin/dashboard'); // Admin dashboard
        } else {
          navigate('/employee/dashboard'); // Employee dashboard
        }
      } else {
        alert(data.message); // Display error message if login fails
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };


  return (
    <div className='admin-login-popup'>
      <div className="admin-login-popup-content">
        <div className="admin-login-popup-left">
          <h2>Login to Your Account</h2>
          <p>Don't have an account? <span onClick={() => alert('Redirect to Sign Up')}>Sign Up Here</span></p>
        </div>
        <div className="admin-login-popup-right">
          <h2>Login</h2>
          <input
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="admin-login-popup-button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin_LoginPopUp;