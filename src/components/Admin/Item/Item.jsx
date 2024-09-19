// FoodItem.js
import React, { useState } from 'react'
import './Item.css'
// import { useNavigate } from 'react-router-dom';
// import { assets } from '../../assets/assets'
// import Cart from '../../../pages/Customer/Cart/Cart'; // Import the Cart component

const FoodItem = ({ id, name, price, description, image }) => {
  // const [showCart, setShowCart] = useState(false); // Initialize a state to track whether to show the cart
  
  // const handleClick = () => {
  //   setShowCart(true); // Set showCart to true when the button is clicked
  // };

  return (
    <div className="item-food-card">
  <div className="item-food-card-img-container">
    <img className="item-food-card-image" src={image} alt={name} />
  </div>
  <div className="item-food-card-info">
    <div className="item-food-card-name-rating">
      <p>{name}</p>
      {/* Add rating or other details here if needed */}
    </div>
    {/* {showCart && <Cart id={id} name={name} image={image} description={description}/>}  */}
  </div>
  <div className="edit-delete-container">
  <div className="edit-btn">
  <button className="item-btn-cart" >e</button>
  <button className="item-btn-cart" >d</button>
  </div>
  </div>
</div>

  )
}

export default FoodItem;