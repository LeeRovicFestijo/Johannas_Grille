// CustomerProfile.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './CustomerProfile.css';

const CustomerProfile = () => {
    return (
        <div className="customer-profile-dropdown">
            <h4><i className="fas fa-user-circle"></i> John Doe</h4> {/* Profile icon */}
            <Link to="/customerinfo"><i className="fas fa-user"></i> View Profile</Link> {/* Use Link for navigation */}
            <a href='/'><i className="fas fa-sign-out-alt"></i> Logout</a> {/* Logout icon */}
        </div>
    );
}

export default CustomerProfile;