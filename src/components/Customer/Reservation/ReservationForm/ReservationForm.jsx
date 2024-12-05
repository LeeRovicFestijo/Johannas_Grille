import React, { useState } from 'react';
import './ReservationForm.css';
import CustomerReservationMenu from '../CustomerReservationMenu/CustomerReservationMenu';
import CustomerReservationReceipt from '../CustomerReservationReceipt/CustomerReservationReceipt'; // Import the receipt component
import { IoIosCloseCircleOutline } from "react-icons/io";

const ReservationForm = ({ reservationId, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reservationDetails, setReservationDetails] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false); // New state for receipt
  const branchOptions = ["Batangas", "Bauan"];

  const handleCheckboxChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  const handleTermsClick = (e) => {
    e.preventDefault();
    setIsReceiptOpen(true); // Open the receipt popup
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      alert('Please accept the terms and conditions.');
      return;
    }

    const formData = {
      reservationDetails: {
        reservationId: reservationId,
        numberofguests: e.target.guests.value,
        reservationdate: e.target.date.value,
        reservationtime: e.target.time.value,
        branch: e.target.branch.value,
      },
    };

    try {
      const response = await fetch('http://localhost:3000/api/reservations/create', {
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
      {isReceiptOpen && (
        <CustomerReservationReceipt
          reservationId={reservationId}
          onClose={() => setIsReceiptOpen(false)} // Close the receipt popup
        />
      )}

      {!isSubmitted ? (
        <div className="res-modal-overlay">
          <div className="res-modal-content modern">
            <h1>{reservationId}</h1>
            <h2 className="res-title modern"> Make a Reservation</h2>
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
                    min="09:30"
                    max="20:30"
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
                    I accept the <a href="#" onClick={handleTermsClick} className="terms-condition">Terms and Conditions</a>
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
        <CustomerReservationMenu reservationDetails={reservationDetails} onClose={onClose} reservationId={reservationId} />
      )}
    </>
  );
};

export default ReservationForm;
