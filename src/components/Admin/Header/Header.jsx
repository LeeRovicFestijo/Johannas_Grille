import React, { useState } from 'react';
import { CgMoreVerticalAlt } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
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
          <div className="name">Candor, Valerie Myca L.</div>
          <div className="role">Administrator</div>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/734201e55d4fb723c84ea91e8101c53f5dea06defe30783025a534621eabbcb6?placeholderIfAbsent=true&apiKey=f5640191d60f45f28ab9a480644a186e"
          alt="Administrator profile"
          className="profile-image"
        />
        <div className="dropdown">
          <CgMoreVerticalAlt size={20} className="cursor-pointer" onClick={toggleDropdown} />
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
