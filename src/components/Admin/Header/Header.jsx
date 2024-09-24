import React, { useState } from 'react';
import { CgMoreVerticalAlt } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import './Header.css'; // Import the new CSS file


function Header({ text }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleClickOutside = (event) => {
    if (event.target.closest('.dropdown-content') === null) {
      setIsDropdownOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    navigate('/admin/login');
  };

  return (
    <header className="profile-header">
      <h1>{text}</h1>
      <div className="profile-container">
        <div className="profile-info">
          <div className="name">Admin</div>
          <div className="role">Administrator</div>
        </div>
        <div className="dropdown">
        <i className="profile-image" onClick={toggleDropdown} >{<CgProfile size={40}/>}</i>
          {isDropdownOpen && (
            <div className="dropdown-content">
              <ul>
                <li>Account Settings</li>
                <li className="logout" onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
