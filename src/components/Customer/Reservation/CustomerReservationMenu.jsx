import React, { useState } from 'react';
import CustomerReservationPayment from './CustomerReservationPayment'
import { IoIosCloseCircleOutline } from "react-icons/io";
import './CustomerReservationMenu.css'

const CustomerReservationMenu = ({ reservationDetails, onClose }) => {
    const menuItems = {
      'Menu A - P500.00': [
        { name: 'Babyback Ribs', image: '/src/assets/02.jpg', price: 500.00 },
        { name: 'Special Pancit Canton', image: '/src/assets/02.jpg', price: 500.00 },
        { name: 'Chopsuey', image: '/src/assets/02.jpg', price: 500.00 },
        { name: 'Buttered vegetable with quail egg', image: '/src/assets/02.jpg', price: 500.00 },
        { name: 'Pork Caldereta', image: '/src/assets/02.jpg', price: 500.00 },
        { name: 'Hunnys Fried Chicken', image: '/src/assets/02.jpg', price: 500.00 },
        { name: 'Italian Chicken', image: '/src/assets/02.jpg', price: 500.00 },
        { name: 'Shanghai Rolls', image: '/src/assets/02.jpg', price: 500.00 },
        { name: 'Buttered Fishfillet', image: '/src/assets/02.jpg', price: 500.00 },
        { name: 'Blueberry Cheesecake Minis', image: '/src/assets/02.jpg', price: 500.00 },
        { name: 'Special Turon Rolls', image: '/src/assets/02.jpg', price: 500.00 },
        { name: 'Regular Iced Tea', image: '/src/assets/02.jpg', price: 500.00 },
        { name: 'Steamed Rice', image: '/src/assets/02.jpg', price: 500.00 },
      ],
      'Menu B - P600.00': [
        { name: 'Babyback Ribs', image: '/src/assets/02.jpg', price: 600.00 },
        { name: 'Special Pancit Canton', image: '/src/assets/02.jpg', price: 600.00 },
        { name: 'Chopsuey', image: '/src/assets/02.jpg', price: 600.00 },
        { name: 'Buttered vegetable with quail egg', image: '/src/assets/02.jpg', price: 600.00 },
        { name: 'Honey Garlic Chicken', image: '/src/assets/02.jpg', price: 600.00 },
        { name: 'Sweet Chili Garlic(Clums/Mussels)', image: '/src/assets/02.jpg', price: 600.00 },
        { name: 'Italian Chicken', image: '/src/assets/02.jpg', price: 600.00 },
        { name: 'Beef Caldereta', image: '/src/assets/02.jpg', price: 600.00 },
        { name: 'Salisbury Steak', image: '/src/assets/02.jpg', price: 600.00 },
        { name: 'Lengua', image: '/src/assets/02.jpg', price: 600.00 },
        { name: 'Spaghetti Bolognese', image: '/src/assets/02.jpg', price: 600.00 },
        { name: 'Seafood Pasta', image: '/src/assets/02.jpg', price: 600.00 },
        { name: 'Cheesy Sausage Penne', image: '/src/assets/02.jpg', price: 600.00 },
        { name: 'Blueberry Cheesecake Minis', image: '/src/assets/02.jpg', price: 600.00 },
        { name: 'Turon Rolls', image: '/src/assets/02.jpg', price: 600.00 },
        { name: 'Buko Pandan', image: '/src/assets/02.jpg', price: 600.00 },
        { name: 'Bottomless Iced Tea', image: '/src/assets/02.jpg', price: 600.00 },
        { name: 'Canned Juice', image: '/src/assets/02.jpg', price: 600.00 },
        { name: 'Bottomless Soda', image: '/src/assets/02.jpg', price: 600.00 },
        { name: 'Steamed Rice', image: '/src/assets/02.jpg', price: 600.00 },
      ],
      'Menu C - P700.00': [
        { name: 'Babyback Ribs', image: '/src/assets/02.jpg', price: 700.00 },
        { name: 'Special Pancit Canton', image: '/src/assets/02.jpg', price: 700.00 },
        { name: 'Chopsuey', image: '/src/assets/02.jpg', price: 700.00 },
        { name: 'Buttered vegetable with quail egg', image: '/src/assets/02.jpg', price: 700.00 },
        { name: 'Honey Garlic Chicken', image: '/src/assets/02.jpg', price: 700.00 },
        { name: 'Sweet Chili Garlic(Clums/Mussels)', image: '/src/assets/02.jpg', price: 700.00 },
        { name: 'Italian Chicken', image: '/src/assets/02.jpg', price: 700.00 },
        { name: 'Grilled Salmon Steak', image: '/src/assets/02.jpg', price: 700.00 },
        { name: 'Grilled Tanigue Steak', image: '/src/assets/02.jpg', price: 700.00 },
        { name: 'Beef Caldereta', image: '/src/assets/02.jpg', price: 700.00 },
        { name: 'Salisbury Steak', image: '/src/assets/02.jpg', price: 700.00 },
        { name: 'Lengua', image: '/src/assets/02.jpg', price: 700.00 },
        { name: 'Callos', image: '/src/assets/02.jpg', price: 700.00 },
        { name: 'Spaghetti Bolognese', image: '/src/assets/02.jpg', price: 700.00 },
        { name: 'Seafood Pasta', image: '/src/assets/02.jpg', price: 700.00 },
        { name: 'Cheesy Sausage Penne', image: '/src/assets/02.jpg', price: 700.00 },
        { name: 'Blueberry Cheesecake Minis', image: '/src/assets/02.jpg', price: 700.00 },
        { name: 'Turon Rolls', image: '/src/assets/02.jpg', price: 700.00 },
        { name: 'Buko Pandan', image: '/src/assets/02.jpg', price: 700.00 },
        { name: 'Fruit Salad', image: '/src/assets/02.jpg', price: 700.00 },
        { name: 'Bottomless Iced Tea', image: '/src/assets/02.jpg', price: 700.00 },
        { name: 'Canned Juice', image: '/src/assets/02.jpg', price: 700.00 },
        { name: 'Bottomless Soda', image: '/src/assets/02.jpg', price: 700.00 },
        { name: 'Steamed Rice', image: '/src/assets/02.jpg', price: 700.00 },
      ],
      'Menu D - P800.00': [
        { name: 'Seafood Paella Fried Rice', image: '/src/assets/02.jpg', price: 800.00 },
        { name: 'Babyback Ribs', image: '/src/assets/02.jpg', price: 800.00 },
        { name: 'Callos', image: '/src/assets/02.jpg', price: 800.00 },
        { name: 'Lengua', image: '/src/assets/02.jpg', price: 800.00 },
        { name: 'Salisbury Steak', image: '/src/assets/02.jpg', price: 800.00 },
        { name: 'Beef Caldereta', image: '/src/assets/02.jpg', price: 800.00 },
        { name: 'Calderetang Kambing', image: '/src/assets/02.jpg', price: 800.00 },
        { name: 'Grilled Salmon Steak', image: '/src/assets/02.jpg', price: 800.00 },
        { name: 'Honey Garlic Chicken', image: '/src/assets/02.jpg', price: 800.00 },
        { name: 'Italian Chicken', image: '/src/assets/02.jpg', price: 800.00 },
        { name: 'Lechon Kawali', image: '/src/assets/02.jpg', price: 800.00 },
        { name: 'Spaghetti Bolognese', image: '/src/assets/02.jpg', price: 800.00 },
        { name: 'Seafood Pasta', image: '/src/assets/02.jpg', price: 800.00 },
        { name: 'Cheesy Sausage Penne', image: '/src/assets/02.jpg', price: 800.00 },
        { name: 'Blueberry Cheesecake Minis', image: '/src/assets/02.jpg', price: 800.00 },
        { name: 'Turon Rolls', image: '/src/assets/02.jpg', price: 800.00 },
        { name: 'Buko Pandan', image: '/src/assets/02.jpg', price: 800.00 },
        { name: 'Fruit Salad', image: '/src/assets/02.jpg', price: 800.00 },
        { name: 'Bottomless Iced Tea', image: '/src/assets/02.jpg', price: 800.00 },
        { name: 'Canned Juice', image: '/src/assets/02.jpg', price: 800.00 },
        { name: 'Bottomless Soda', image: '/src/assets/02.jpg', price: 800.00 },
        { name: 'Steamed Rice', image: '/src/assets/02.jpg', price: 800.00 },
      ],
    };
  
    const [selectedItems, setSelectedItems] = useState({});
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  
    const handleItemSelection = (name, price, increment) => {
      setSelectedItems((prev) => {
        const currentQty = prev[name]?.qty || 0;
        const newQty = Math.max(currentQty + increment, 0);
        return { ...prev, [name]: { qty: newQty, price } };
      });
    };
  
    const handleConfirmSelection = () => {
      setIsConfirmOpen(true);
    };
  
    const handleConfirmPayment = () => {
      setIsPaymentOpen(true);
    };
  
    const handleFinalSubmit = () => {
      console.log("Selected Items:", selectedItems);
      onClose();
    };
  
    const ConfirmPopup = ({ selectedItems, onConfirm, onCancel }) => {
      const totalAmount = Object.values(selectedItems).reduce((total, { qty, price }) => {
        return total + qty * price;
      }, 0);
  
      return (
        <div className="confirm-popup-overlay">
          <div className="confirm-popup-content">
            <h2>Confirm Your Selection</h2>
            <ul>
              {Object.entries(selectedItems).map(([item, { qty, price }]) => (
                <li key={item}>
                  {item}: {qty}
                </li>
              ))}
            </ul>
            <h3>Total Amount: P{totalAmount.toFixed(2)}</h3>
            <div className="popup-buttons">
              <button className="confirm" onClick={handleConfirmPayment}>Confirm</button>
              <button className="cancel" onClick={onCancel}>Cancel</button>
            </div>
          </div>
        </div>
      );
    };
  
    return (
      <div className="menu-popup">
        <div className="menu-popup-content">
          <button className="menu-popup-close" onClick={onClose}><IoIosCloseCircleOutline size={33}/></button>
          <h2>Select Your Package</h2>
  
       {Object.keys(menuItems).map((category) => (
    <div key={category} className="menu-grid-container">
      <h3>{category}</h3>
      <div className="menu-grid">
        {menuItems[category].map((item, index) => (
          <div key={index} className="menu-item">
            <img src={item.image} alt={item.name} className="menu-item-image" />
            <div className="menu-item-details">
              <h3>{item.name}</h3>
              <div className="menu-quantity">
                <button
                  className="menu-quantity-button"
                  onClick={() => handleItemSelection(item.name, item.price, -1)}
                >-</button>
                <span>{selectedItems[item.name]?.qty || 0}</span>
                <button
                  className="menu-quantity-button"
                  onClick={() => handleItemSelection(item.name, item.price, 1)}
                >+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ))}
  
          <button onClick={handleConfirmSelection} className="confirm-menu">
            Confirm Selection
          </button>
  
          {isConfirmOpen && (
            <ConfirmPopup
              selectedItems={selectedItems}
              onConfirm={handleFinalSubmit}
              onCancel={() => setIsConfirmOpen(false)}
            />
          )}
  
          {isPaymentOpen && (
            <CustomerReservationPayment
            reservationDetails={reservationDetails}
            selectedItems={selectedItems}
            onConfirm={() => setIsPaymentOpen(false)}  // This closes the payment popup, but doesn't affect the parent modal
            onPaymentComplete={() => onClose()}      // This should close the parent modal after successful payment
            onClose={onClose} // Pass onClose down here to handle the close action properly
          />
  
          )}
  
        </div>
      </div>
    );
  };

export default CustomerReservationMenu
