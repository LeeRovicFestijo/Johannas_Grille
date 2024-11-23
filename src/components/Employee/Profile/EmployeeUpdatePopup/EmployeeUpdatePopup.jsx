import React, { useState } from 'react';
import './EmployeeUpdatePopup.css';

const EmployeeUpdatePopup = ({ showPopup, handleClose, username, email, image, setUsername, setEmail, setImage }) => {
  const [imagePreview, setImagePreview] = useState(image); // Initialize with the current image

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to update profile information here
    console.log('Profile Updated:', { username, email, image });
    handleClose(); // Close the popup after saving
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Preview the image before upload
        setImage(reader.result); // Set the image in state
      };
      reader.readAsDataURL(file);
    }
  };

  if (!showPopup) return null;

  return (
    <div className="employee-popup-overlay">
      <div className="employee-popup-content">
        <h2>Update Profile</h2>
        <form onSubmit={handleSubmit}>

          {/* Username Field */}
          <div className="employee-form-group">
            <label htmlFor="popup-username">Username</label>
            <input
              type="text"
              id="popup-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email Address Field */}
          <div className="employee-form-group">
            <label htmlFor="popup-email">Email Address</label>
            <input
              type="email"
              id="popup-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Profile Image Field */}
          <div className="employee-form-group">
            <label htmlFor="popup-image">Profile Image</label>
            <input
              type="file"
              id="popup-image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="employee-image-preview">
                <img src={imagePreview} alt="Profile Preview" />
              </div>
            )}
          </div>

          {/* Popup Buttons */}
          <div className="employee-popup-buttons">
            <button type="submit" className="employee-popup-update-btn">Save</button>
            <button type="button" className="employee-popup-close-btn" onClick={handleClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeUpdatePopup;