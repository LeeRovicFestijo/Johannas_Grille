// FoodItem.js
import React, { useState } from 'react'
import './FoodItem.css'
// import { useNavigate } from 'react-router-dom';
// import { assets } from '../../assets/assets'
import Cart from '../../../pages/Customer/Cart/Cart'; // Import the Cart component

const FoodItem = ({ id, name, price, description, image }) => {
  const [showCart, setShowCart] = useState(false); // Initialize a state to track whether to show the cart
  
  const handleClick = () => {
    setShowCart(true); // Set showCart to true when the button is clicked
  };

  return (
    <div className="food-card">
  <div className="food-card-img-container">
    <img className="food-card-image" src={image} alt={name} />
  </div>
  <div className="food-card-info">
    <div className="food-card-name-rating">
      <p>{name}</p>
      {/* Add rating or other details here if needed */}
    </div>
    <button className="btn-cart" onClick={handleClick}>Add to Cart</button>
    {showCart && <Cart id={id} name={name} image={image} description={description}/>} 
  </div>
</div>

  )
}

export default FoodItem;