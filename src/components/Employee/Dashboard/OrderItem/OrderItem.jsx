import React, { useState } from 'react';
import './OrderItem.css';

const OrderItem = ({ orderid, items }) => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the dropdown

  // Function to toggle the order details
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="em-order-item">
      <div className="em-order-header" onClick={toggleDropdown}>
        <div className="em-order-name">
          <h3>Order #{orderid}</h3>
        </div>
      </div>
      
      {/* Conditionally render the order details based on the isOpen state */}
      {isOpen && (
        <div className="em-order-details">
          {items.map((item, index) => (
            <div key={index} className="em-order-item-detail">
              <div className="em-item-info">
                <h4>{item.name}</h4>
                <p>Price: ${item.price}</p>
              </div>
              <p className='em-qty'>Qty: {item.qty}</p>
            </div>
          ))}
          <hr />
          <div className="em-order-footer">
            <div className="em-item">
              <span className="em-order-summary">{items.length} Items</span>
              <span className="em-order-total">Total: ${items.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderItem;
