import React, { useEffect, useState } from 'react';
import { RxAvatar } from "react-icons/rx";
import Navbar from '../../../pages/Customer/Navbar/Navbar';
import './CustomerInfo.css';

const ProfileCustomer = () => {
  const [image, setImage] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [usertype, setUserType] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedImage = sessionStorage.getItem('image');
    console.log('Image URL:', storedImage); // Log the image URL for debugging

    // Prepend base URL if necessary
    const baseURL = 'http://localhost:3000';
    setImage(storedImage ? `${baseURL}${storedImage}` : '');
    setFirstname(sessionStorage.getItem('firstname'));
    setLastname(sessionStorage.getItem('lastname'));
    setEmail(sessionStorage.getItem('email'));
    setUserType(sessionStorage.getItem('usertype'));
    setUsername(sessionStorage.getItem('username'));
  }, []);

  return (
    <main>
      <Navbar />
      <div className="customer-info-header">
        <h1>Profile</h1>
      </div>

      <div className="customer-info-content">
        <div className="customer-info">
          <div className="customer-avatar-box">
            {image ? (
              <img src={image} alt="Profile" className="customer-avatar-img" />
            ) : (
              <RxAvatar className="customer-avatar" size={100} />
            )}
          </div>
                      {/* Fixed name under the avatar */}
          <h2 className="customer-avatar-name">John Doe</h2> {/* Change this to the fixed name you want */}
          <div className="customer-personal-info">
            <p>{usertype}</p>
          </div>
        </div>

        <div className="customer-info-form">
          <h3>Account Settings</h3>
          <div className="customer-form-row">
            <div className="customer-form-group">
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                id="first-name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="customer-form-group">
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                id="last-name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>

          <div className="customer-form-row">
            <div className="customer-form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="customer-form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button className="customer-update-btn">Update</button>
        </div>
      </div>
    </main>
  );
};

export default ProfileCustomer;