import React, { useEffect, useState } from 'react';
import Sidebar from "../../../components/Employee/Sidebar/Sidebar";
import { RxAvatar } from "react-icons/rx";
import "./Profile.css";

const ProfileEmployee = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');  // This should store the email
  const [usertype, setUserType] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    setFirstname(sessionStorage.getItem('firstname'));
    setLastname(sessionStorage.getItem('lastname'));
    setEmail(sessionStorage.getItem('email')); // Check if this retrieves the email
    setUserType(sessionStorage.getItem('usertype'));
    setUsername(sessionStorage.getItem('username'));
  
    console.log(sessionStorage.getItem('email')); // Check if email is retrieved correctly
  }, []);
  

  return (
    <main>
      <Sidebar />
      <div className="employee-profile-wrapper">
        <div className="employee-profile-header">
          <h1>Profile</h1>
        </div>

        <div className="employee-profile-content">
          <div className="employee-profile-info">
            <div className="employee-avatar-box">
              <RxAvatar className="employee-avatar" size={100} />
            </div>
            <h2>{firstname} {lastname}</h2>
            <div className="employee-personal-info">
              <p>{usertype}</p> {/* Display the actual email */}
            </div>
          </div>

          <div className="employee-profile-form">
            <h3>Account Settings</h3>
            <div className="employee-form-row">
              <div className="employee-form-group">
                <label htmlFor="first-name">First Name</label>
                <input 
                  type="text" 
                  id="first-name" 
                  value={firstname} 
                  onChange={(e) => setFirstname(e.target.value)} 
                />
              </div>
              <div className="employee-form-group">
                <label htmlFor="last-name">Last Name</label>
                <input 
                  type="text" 
                  id="last-name" 
                  value={lastname} 
                  onChange={(e) => setLastname(e.target.value)} 
                />
              </div>
            </div>

            <div className="employee-form-row">
              <div className="employee-form-group">
                <label htmlFor="username">Username</label>
                <input 
                  type="text" 
                  id="username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                />
              </div>
              <div className="employee-form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
            </div>

            <button className="employee-update-btn">Update</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileEmployee;
