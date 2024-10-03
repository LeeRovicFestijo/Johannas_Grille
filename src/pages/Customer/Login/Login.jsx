import React, { useState } from 'react';
import './Login.css';
import { IoIosCloseCircle } from "react-icons/io";

const LoginPopUp = () => {
  const [currState, setCurrState] = useState("Sign Up");
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className='login-popup'>
      <div className="login-popup-content">
        <div className="login-popup-left">
          <h2>Create Account for Reservation</h2>
          {currState === "Login" ? (
            <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Sign Up</span></p>
          ) : (
            <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>
          )}
        </div>
        <div className="login-popup-right">
          <span className="login-popup-close" onClick={handleClose}><IoIosCloseCircle size={25} /></span>
          <h2>{currState}</h2>
          {currState === "Sign Up" && 
          <input type="text" placeholder='Name' required />
          }
          <input type="email" placeholder='Email' required />
          <input type="number" placeholder='Phone Number' required />
          {currState === "Sign Up" && 
          <input type="text" placeholder='Address' required />
          }
          <input type="password" placeholder='Password' required />
          <button className="login-popup-button">
            {currState === "Sign Up" ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPopUp;
