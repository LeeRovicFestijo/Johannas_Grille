import React, { useState } from 'react';
import './FoodItem.css';
import Cart from '../../../pages/Customer/ItemPopup/ItemPopup'; // Import the Cart component

const FoodItem = ({ id, name, image, prices }) => {
  const [showCart, setShowCart] = useState(false); // Initialize a state to track whether to show the cart
  
  const handleClick = () => {
    setShowCart(false); // Set showCart to true when the button is clicked

    setTimeout(() => {
      setShowCart(true);
    }, 0);
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
        {showCart && (
          <Cart 
            id={id} 
            name={name} 
            image={image}
            prices={prices} // Pass prices directly from props
          />
        )} 
      </div>
    </div>
  );
}

export default FoodItem;
