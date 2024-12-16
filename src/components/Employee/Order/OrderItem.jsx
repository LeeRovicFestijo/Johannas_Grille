import React from 'react';
import './OrderItem.css'; // Import the CSS file

function OrderItem({ item, increaseQuantity, decreaseQuantity }) {
  return (
    <div className="emp-order-item">
      <img src={item.image_url} alt={item.name} className="emp-item-image" />
      <div className="emp-item-details">
        <div className="emp-info">
          <span className="emp-item-name">{item.name}</span>
          <span className="emp-item-price">₱{item.price}</span>
        </div>
        <div className="emp-item-controls">
          <div className="emp-quantity-controls">
            <button onClick={decreaseQuantity}>-</button>
            <span>{item.quantity}</span>
            <button onClick={increaseQuantity}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
