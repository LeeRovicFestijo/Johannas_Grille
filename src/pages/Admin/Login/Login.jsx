import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Admin_LoginPopUp = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Add logic to handle sign-up or login form submission here
    // For now, we'll just navigate to the BaseLayout page
    navigate('/admin/dashboard');
  };

  return (
    <div className='admin-login-popup'>
      <div className="admin-login-popup-content">
        <div className="admin-login-popup-left">
          <h2>Create Account for Reservation</h2>
          {currState === "Login" ? (
            <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Sign Up</span></p>
          ) : (
            <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>
          )}
        </div>
        <div className="admin-login-popup-right">
          <h2>{currState}</h2>
          {currState === "Sign Up" && <input type="text" placeholder='Name' required />}
          <input type="email" placeholder='Email' required />
          <input type="password" placeholder='Password' required />
          {currState === "Sign Up" && <input type="text" placeholder='Address' required />}
          <button className="admin-login-popup-button" onClick={handleButtonClick}>
            {currState === "Sign Up" ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin_LoginPopUp;
