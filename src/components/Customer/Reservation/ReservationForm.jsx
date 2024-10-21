import React, { useState } from 'react';
import './ReservationForm.css';

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
      <button className="terms-close-button" onClick={onClose}>Close</button>
      <h2>Terms and Conditions</h2>
      <ol>
        <li>
          <strong>Introduction</strong>
          <p>Welcome to [Your Restaurant Name]. We strive to provide our guests with exceptional dining experiences. By making a reservation or purchasing food and beverages from our establishment, you agree to abide by the following terms and conditions regarding our No Return and No Refund policy. Please read these terms carefully.</p><br />
        </li>
        <li>
          <strong>No Return Policy</strong>
          <p>All sales of food and beverages are final. Once an order is placed and accepted, we do not accept any returns for any reason. This policy applies to:</p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            <li>Dine-in meals</li>
            <li>Take-out orders</li>
            <li>Catering services</li><br />
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
          <p>By placing an order or making a reservation at [Your Restaurant Name], you acknowledge that you have read and understood these Terms and Conditions and agree to abide by our No Return and No Refund policy. If you do not agree with these terms, please refrain from placing an order.</p><br />
        </li>
        <li>
          <strong>Contact Us</strong>
          <p>If you have any questions or concerns regarding these Terms and Conditions, please contact us at:</p>
          <div className="contact-info">
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
              <li><strong>Email:</strong> [Your Email Address]</li>
              <li><strong>Phone:</strong> [Your Phone Number]</li>
              <li><strong>Address:</strong> [Your Restaurant Address]</li>
            </ul>
          </div>
        </li>
      </ol>
    </div>
  </div>
);

// Menu Popup Component
// Menu Popup Component with Categories
const MenuPopupForm = ({ reservationDetails, onClose }) => {
  const menuItems = {
    'Menu A': [
      {
        name: 'Babyback Ribs',
        image: '/src/assets/01.jpg',
        details: 'Babyback Ribs slices',
        price: "P 500.00",
      },
      {
        name: 'Pizza Combo',
        image: '/src/assets/02.jpg',
        details: 'Includes pizza, fries, soda, and ice cream',
        price: "P 600.00",
      },
    ],
    'Menu B': [
      {
        name: 'Burger Combo',
        image: '/src/assets/03.jpg',
        details: 'Includes burger, fries, salad, and a drink',
        price: "P 700.00",
      },
      {
        name: 'Steak Meal',
        image: '/src/assets/04.jpg',
        details: 'Includes steak, mashed potatoes, and a drink',
        price: "P 800.00",
      },
    ],
    'Menu C': [
      {
        name: 'Burger Combo',
        image: '/src/assets/03.jpg',
        details: 'Includes burger, fries, salad, and a drink',
        price: "P 700.00",
      },
      {
        name: 'Steak Meal',
        image: '/src/assets/04.jpg',
        details: 'Includes steak, mashed potatoes, and a drink',
        price: "P 800.00",
      },
    ],
    'Menu D': [
      {
        name: 'Burger Combo',
        image: '/src/assets/03.jpg',
        details: 'Includes burger, fries, salad, and a drink',
        price: "P 700.00",
      },
      {
        name: 'Steak Meal',
        image: '/src/assets/04.jpg',
        details: 'Includes steak, mashed potatoes, and a drink',
        price: "P 800.00",
      },
    ],
  };

  const [selectedItems, setSelectedItems] = useState({});
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleItemSelection = (name, increment) => {
    setSelectedItems((prev) => {
      const currentQty = prev[name] || 0;
      const newQty = Math.max(currentQty + increment, 0); // Prevent negative quantity
      return { ...prev, [name]: newQty };
    });
  };

  const handleConfirmSelection = () => {
    setIsConfirmOpen(true); // Open the confirmation popup
  };

  const handleFinalSubmit = () => {
    console.log("Selected Items:", selectedItems);
    onClose(); // Close the form after confirmation
  };

  return (
    <div className="res-popup">
      <div className="res-popup-content">
        <button className="res-popup-close" onClick={onClose}>Close</button>
        <h2>Select Your Package</h2>

        {/* Iterate over the categories */}
        {Object.keys(menuItems).map((category) => (
          <div key={category}>
            <h3>{category}</h3>
            <div className="res-grid">
              {menuItems[category].map((item, index) => (
                <div key={index} className="res-item">
                  <img src={item.image} alt={item.name} className="res-item-image" />
                  <div className="res-item-details">
                    <h3>{item.name}</h3>
                    <p>{item.details}</p>
                    <div className="res-price-container">
                      <span className="res-price">{item.price}</span>
                    </div>
                    <div className="res-quantity">
                      <button
                        className="res-quantity-button"
                        onClick={() => handleItemSelection(item.name, -1)}
                      >-</button>
                      <span>{selectedItems[item.name] || 0}</span>
                      <button
                        className="res-quantity-button"
                        onClick={() => handleItemSelection(item.name, 1)}
                      >+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button onClick={handleConfirmSelection} className="res-confirm-menu">
          Confirm Selection
        </button>

        {isConfirmOpen && (
          <ConfirmPopup
            selectedItems={selectedItems}
            onConfirm={handleFinalSubmit}
            onCancel={() => setIsConfirmOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

const ConfirmPopup = ({ selectedItems, onConfirm, onCancel }) => (
  <div className="confirm-modal-overlay">
    <div className="confirm-modal-content">
      <h2>Confirm Your Selection</h2>
      <p>Are you sure you want to confirm the following items?</p>
      <ul>
        {Object.entries(selectedItems).map(([name, quantity]) => (
          quantity > 0 && (
            <li key={name}>{name}: {quantity}</li>
          )
        ))}
      </ul>
      <div className="confirm-buttons">
        <button className="confirm-button" onClick={onConfirm}>
          Yes, Confirm
        </button>
        <button className="cancel-button" onClick={onCancel}>
          No, Go Back
        </button>
      </div>
    </div>
  </div>
);

export default ReservationForm;
