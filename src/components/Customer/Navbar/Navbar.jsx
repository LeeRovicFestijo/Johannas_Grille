import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../../assets/assets'
import { Link } from 'react-router-dom';
import AddToCart from '../../../pages/Customer/AddToCart/AddToCart';
import Login from '../../../pages/Customer/Login/Login'
import { FiShoppingCart } from "react-icons/fi";


const Navbar = ( ) => {

    const [menu,setMenu] = useState("home");
    const [showLogin, setShowLogin] = useState(false); // Initialize a state to track whether to show the cart
    const [showaddCart, setShowAddToCart] = useState(false);

  const handleCartClick = () => {
    setShowAddToCart(prevState => !prevState); // Set showCart to true when the button is clicked
  };

  const handleLoginClick = () => {
    setShowLogin(prevState => !prevState); // Set showCart to true when the button is clicked
  };


  return (
    <div className='navbar'>
      <img src={assets.logo} alt="" className="logo" />
      <ul className="navbar-menu">
        <Link to='/'onClick={()=>setMenu("home")}className={menu==="home"?"active":""}>HOME</Link>
        <a href='#explore-menu'onClick={()=>setMenu("menu")}className={menu==="menu"?"active":""}>MENU</a>
        <a href='#reservation'onClick={()=>setMenu("reservation")}className={menu==="reservation"?"active":""}>RESERVATION</a>
        <a href='#footer'onClick={()=>setMenu("contact us")}className={menu==="contact us"?"active":""}>CONTACT US</a>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <i onClick={handleCartClick} className='nav'>{<FiShoppingCart size={26}/>}</i>
          {showaddCart && <AddToCart />}
          <div className="dot"></div>
        </div>
        <button onClick={handleLoginClick} className='login-btn'>Sign In</button>
        {showLogin && <Login />}
      </div>
    </div>
  )
}

export default Navbar
