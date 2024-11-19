import React, { useEffect, useState } from 'react';
import EmployeeUpdatePopup from '../EmployeeUpdatePopup/EmployeeUpdatePopup';
import { RxAvatar } from "react-icons/rx";
import "./EmployeeProfile.css";

const EmployeeProfile = () => {
    const [image, setImage] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');  // This should store the email
    const [usertype, setUserType] = useState('');
    const [username, setUsername] = useState('');
    const [showPopup, setShowPopup] = useState(false); // Popup state

    useEffect(() => {
        const storedImage = sessionStorage.getItem('image');
        console.log('Image URL:', storedImage); // Log the image URL for debugging

        // Prepend base URL if necessary
        const baseURL = 'http://localhost:3000';
        setImage(storedImage ? `${baseURL}${storedImage}` : '');
        setFirstname(sessionStorage.getItem('firstname'));
        setLastname(sessionStorage.getItem('lastname'));
        setEmail(sessionStorage.getItem('email')); // Check if this retrieves the email
        setUserType(sessionStorage.getItem('usertype'));
        setUsername(sessionStorage.getItem('username'));

        console.log(sessionStorage.getItem('email')); // Check if email is retrieved correctly
    }, []);

    const handleUpdateClick = () => {
        setShowPopup(true); // Show the popup
      };
    
      const handleClosePopup = () => {
        setShowPopup(false); // Close the popup
      };

    return (
        <div className="employees-profile-wrapper">
            <div className="employees-profile-header">
                <h1>Profile</h1>
            </div>
            <div className="employees-profile-content">
                <div className="employees-profile-info">
                    <div className="employees-avatar-box">
                        {image ? (
                            <img src={image} alt="Profile" className="employees-avatar" />
                        ) : (
                            <RxAvatar className="admin-avatar" size={100} />
                        )}
                    </div>
                    <h2>{firstname} {lastname}</h2>
                    <div className="employees-personal-info">
                        <p>{usertype}</p> {/* Display the actual email */}
                    </div>
                </div>

                <div className="employees-profile-form">
                    <h3>Account Settings</h3>
                    <div className="employees-form-row">
                        <div className="employees-form-group">
                            <label htmlFor="first-name">First Name</label>
                            <input
                                type="text"
                                id="first-name"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                        </div>
                        <div className="employees-form-group">
                            <label htmlFor="last-name">Last Name</label>
                            <input
                                type="text"
                                id="last-name"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="employees-form-row">
                        <div className="employees-form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="employees-form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <button className="employees-update-btn" onClick={handleUpdateClick} >Update</button>
                </div>
            </div>

            <EmployeeUpdatePopup
                showPopup={showPopup}
                handleClose={handleClosePopup}
                firstname={firstname}
                lastname={lastname}
                username={username}
                email={email}
                image={image} // Pass the current image to the popup
                setFirstname={setFirstname}
                setLastname={setLastname}
                setUsername={setUsername}
                setEmail={setEmail}
                setImage={setImage} // Allow updating the image
            />
        </div>
    );
};

export default EmployeeProfile;
