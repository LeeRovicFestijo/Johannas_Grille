import React, { useState } from 'react';
import './ReservationForm.css';
import CustomerReservationPayment from '../../../components/Customer/Reservation/CustomerReservationPayment'
import { IoIosCloseCircleOutline } from "react-icons/io";

// Main ReservationForm Component
const ReservationForm = ({ onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reservationDetails, setReservationDetails] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const branchOptions = ["Batangas", "Bauan"];

  const handleCheckboxChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  const handleTermsClick = (e) => {
    e.preventDefault();
    setIsTermsOpen(true);
    document.getElementById('term').classList.add('highlight');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      alert('Please accept the terms and conditions.');
      return;
    }

    const formData = {
      numberofguests: e.target.guests.value,
      reservationdate: e.target.date.value,
      reservationtime: e.target.time.value,
      branch: e.target.branch.value,
    };

    try {
      const response = await fetch('http://localhost:3000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setIsSubmitted(true);
        setReservationDetails(data);
        console.log('Reservation created:', data);
      } else {
        console.error('Failed to create reservation');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      {isTermsOpen && <TermsPopup onClose={() => setIsTermsOpen(false)} />}

      {!isSubmitted ? (
        <div className="res-modal-overlay">
          <div className="res-modal-content modern">
            <h2 className="res-title modern">Make a Reservation</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="res-form-grid modern">
                <div className="res-form-group">
                  <label htmlFor="guests">Guests</label>
                  <input
                    type="number"
                    id="guests"
                    name="guests"
                    placeholder="Number of Guests"
                    min="50"
                    required
                  />
                </div>
                <div className="res-form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                  />
                </div>
                <div className="res-form-group">
                  <label htmlFor="time">Time</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    required
                  />
                </div>
                <div className="res-form-group">
                  <label htmlFor="branch">Branch</label>
                  <select id="branch" name="branch" required>
                    <option value="">Select a branch</option>
                    {branchOptions.map((branch, index) => (
                      <option key={index} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="res-form-group" id="term">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    onChange={handleCheckboxChange}
                    required
                  />
                  <label htmlFor="terms">
                    I accept the <a href="#" onClick={handleTermsClick} className='terms-condition'>Terms and Conditions</a>
                  </label>
                </div>
              </div>
              <div className="res-buttons">
                <button className="res-button modern" type="submit">
                  Submit
                </button>
                <button className="res-cancel-button modern" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <MenuPopupForm reservationDetails={reservationDetails} onClose={onClose} />
      )}
    </>
  );
};

// Terms and Conditions Popup Component
const TermsPopup = ({ onClose }) => (
  <div className="terms-modal-overlay">
    <div className="terms-modal-content">
      <button className="terms-close-button" onClick={onClose}><IoIosCloseCircleOutline size={33}/></button>
      <h2>Terms and Conditions</h2>
      <ol>
        <li>
          <strong>Introduction</strong>
          <p>Welcome to Johannas Grille. We strive to provide our guests with exceptional dining experiences. By making a reservation or purchasing food and beverages from our establishment, you agree to abide by the following terms and conditions regarding our No Return and No Refund policy. Please read these terms carefully.</p><br />
        </li>
        <li>
          <strong>No Return Policy</strong>
          <p>All sales of food and beverages are final. Once an order is placed and accepted, we do not accept any returns for any reason. This policy applies to:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>Dine-in meals</li>
            <li>Take-out orders</li>
            <br />
          </ul>
        </li>
        <li>
          <strong>No Refund Policy</strong>
          <p>Due to the nature of our business, we do not issue refunds for any orders placed. This includes, but is not limited to:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>Mistakes made in ordering (e.g., incorrect menu items)</li>
            <li>Disappointment with the food or service</li>
            <li>Changes in personal circumstances that affect your ability to dine with us</li><br />
          </ul>
        </li>
        <li>
          <strong>Exceptions</strong>
          <p>While our policy is strictly "No Returns" and "No Refunds," we recognize that certain situations may arise. The following exceptions may apply:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>If a meal is found to be defective or unsafe (e.g., containing foreign objects or not prepared as specified), please notify a staff member immediately during your visit. We will assess the situation and may offer a replacement or resolution.</li>
            <li>If you have a food allergy or dietary restriction that was not properly communicated or acknowledged at the time of ordering, please inform our staff as soon as possible so we can address your concerns.</li><br />
          </ul>
        </li>
        <li>
          <strong>Customer Responsibility</strong>
          <p>It is the customer's responsibility to review menu items, ingredients, and any special requests before placing an order. We encourage guests to ask questions or seek clarification regarding menu items to avoid any misunderstandings.</p><br />
        </li>
        <li>
          <strong>Acceptance of Terms</strong>
          <p>By placing an order or making a reservation at Johannas Grille, you acknowledge that you have read and understood these Terms and Conditions and agree to abide by our No Return and No Refund policy. If you do not agree with these terms, please refrain from placing an order.</p><br />
        </li>
        <li>
          <strong>Contact Us</strong>
          <p>If you have any questions or concerns regarding these Terms and Conditions, please contact us at:</p>
          <div className="contact-info">
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li><strong>Email:</strong> johannasgrille@yahoo.com</li>
              <li><strong>Phone:</strong> (043)727-1304 / (043)403-5484 / 09532159027</li>
              <li><strong>Address:</strong> Villa Florentina Subd., Manghinao Proper Bauan, Batangas</li>
            </ul>
          </div>
        </li>
      </ol>
    </div>
  </div>
);

// Menu Popup Component
const MenuPopupForm = ({ reservationDetails, onClose }) => {
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
            <button onClick={handleConfirmPayment}>Confirm</button>
            <button onClick={onCancel}>Cancel</button>
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

export default ReservationForm;