import React, { useState } from 'react';
import './ReservationForm.css'; // Updated modern styling

const ReservationForm = ({ onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reservationDetails, setReservationDetails] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    // Generate random Reservation ID
    const reservationID = `RES-${Math.floor(1000 + Math.random() * 9000)}`;

    // Set the details in state
    setReservationDetails({ reservationID });

    // Open the second popup
    setIsSubmitted(true);
  };

  return (
    <>
      {!isSubmitted ? (
        <div className="res-modal-overlay">
          <div className="res-modal-content modern">
      

            <h2 className="res-title modern">Make a Reservation</h2>
            <form onSubmit={handleSubmit}>
              <div className="res-form-grid modern">
                <div className="res-form-group">
                  <label htmlFor="guests">Guests</label>
                  <input type="number" id="guests" name="guests" required />
                </div>
                <div className="res-form-group">
                  <label htmlFor="date">Date</label>
                  <input type="date" id="date" name="date" required />
                </div>
                <div className="res-form-group">
                  <label htmlFor="time">Time</label>
                  <input type="time" id="time" name="time" required />
                </div>
                <div className="res-form-group">
                  <label htmlFor="contact">Contact Number</label>
                  <input type="tel" id="contact" name="contact" required />
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
        <SecondPopupForm reservationDetails={reservationDetails} onClose={onClose} />
      )}
    </>
  );
};

const SecondPopupForm = ({ reservationDetails, onClose }) => {
  return (
    <div className="res-modal-overlay">
      <div className="res-modal-content modern">
        <button className="res-close-icon modern" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1.293 1.293a1 1 0 011.414 0L8 7.586l5.293-6.293a1 1 0 111.414 1.414L9.414 8l5.293 5.293a1 1 0 01-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 01-1.414-1.414L6.586 8 1.293 2.707a1 1 0 010-1.414z"
            />
          </svg>
        </button>

        <h2 className="res-title modern">Reservation Details</h2>
        <div className="res-reservation-id">
          <p>Your Reservation ID:</p>
          <h3>{reservationDetails.reservationID}</h3>
        </div>
        <p className="res-status-text">Pending approval...</p>
        <p className="res-status-text">We will notify you of your reservation status shortly.</p>
        <button className="res-close-popup modern" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ReservationForm;
