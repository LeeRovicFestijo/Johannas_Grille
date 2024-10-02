import React, { useState } from 'react';
import './OrderItem.css';
import { BsEmojiHeartEyes } from "react-icons/bs";
import { IoFastFood } from "react-icons/io5";

const OrderItem = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle the dropdown

  // Function to toggle the order details
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="em-order-item">
      <div className="em-order-header" onClick={toggleDropdown}>
        <div className="em-order-name">
          <h3>Order #{order.id}</h3>
          <span className="em-order-date">{order.date}</span>
        </div>
        <i className="em-user-img"><BsEmojiHeartEyes size={40} /></i>
      </div>
      
      {/* Conditionally render the order details based on the isOpen state */}
      {isOpen && (
        <div className="em-order-details">
          {order.items.map((item, index) => (
            <div key={index}>
              <div className="em-order-item-detail">
                <i className='em-item-image'>
                  <IoFastFood size={40} color='#FF4500' />
                </i>
                <div className="em-item-info">
                  <h4>{item.name}</h4>
                  <p>{item.price}</p>
                </div>
                <p className='em-qty'>Qty: {item.qty}</p>
              </div>
              {index < order.items.length - 1 && <hr />}
            </div>
          ))}
          <hr />
          <div className="em-order-footer">
            <div className="em-item">
              <span className="em-order-summary">{order.items.length} Items</span>
              <span className="em-order-total">{order.total}</span>
            </div>
            <div className="em-action-buttons">
              <button className="em-reject-btn">✕</button>
              <button className="em-approve-btn">✓</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderItem;
