// CustomerProfile.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './CustomerProfile.css';

const CustomerProfile = () => {
    const navigate = useNavigate(); // Hook for programmatic navigation

    const handleLogout = () => {
        // Clear user session (e.g., remove token)
        localStorage.removeItem('token'); // Adjust based on your token storage method

        // Redirect to home page or login page
        navigate('/'); // Change this to your desired route
    };

    return (
        <div className="customer-profile-dropdown">
            <h4><i className="fas fa-user-circle"></i> John Doe</h4> {/* Profile icon */}
            <Link to="/customerinfo"><i className="fas fa-user"></i> View Profile</Link> {/* Use Link for navigation */}
            <button onClick={handleLogout} className="logout-button">
                <i className="fas fa-sign-out-alt"></i> Logout
            </button> {/* Logout button */}
        </div>
    );
}

export default CustomerProfile;
