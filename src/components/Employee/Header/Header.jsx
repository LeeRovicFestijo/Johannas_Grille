import React from 'react';
import './Header.css'
import { BsEmojiExpressionless } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { HiOutlineBell } from "react-icons/hi2";

const Header = () => {
  return (
    <header className="em-header">
      <div className="em-search-container">
      <div className="em-search-box">
        <span className="em-search-icon"></span> {< IoIosSearch size={27} />}
        <input
          type="text"
          className="em-search-input"
          placeholder="Search"
        />
      </div>
    </div>
      <div className="em-profile-icon">
        <i>< HiOutlineBell size={27} /> </i>
        <i>< BsEmojiExpressionless size={30} /> </i>
      </div>
    </header>
  );
}

export default Header;
