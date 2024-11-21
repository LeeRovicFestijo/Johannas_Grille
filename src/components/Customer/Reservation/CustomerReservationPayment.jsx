import { useState } from 'react';
import './CustomerReservationPayment.css';
import { IoIosCloseCircleOutline } from "react-icons/io";
import CustomerReservationReceipt from './CustomerReservationReceipt';

const CustomerReservationPayment = ({ reservationId, onClose }) => {
  const [gcashNumber, setGcashNumber] = useState('');
  const [referenceCode, setReferenceCode] = useState('');
  const [isReceiptVisible, setIsReceiptVisible] = useState(false);

  const handleConfirmReceipt = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/reservations/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reservationId, referenceCode }),
      });

      if (response.ok) {
        setIsReceiptVisible(true); // Show receipt after successful payment
      } else {
        const data = await response.json();
        console.error('Payment error:', data.message);
      }
    } catch (error) {
      console.error('Error during payment:', error);
    }
  };

  return (
    <div className="payment-popup">
      <div className="payment-popup-content">
        <button className="payment-popup-close" onClick={onClose}>
          <IoIosCloseCircleOutline />
        </button>

        <h2>GCash Payment Details</h2>
        <div className="form-group">
          <label htmlFor="gcashNumber">GCash Mobile Number</label>
          <input
            type="text"
            id="gcashNumber"
            value={gcashNumber}
            onChange={(e) => setGcashNumber(e.target.value)}
            placeholder="Enter your GCash number"
            maxLength="11"
          />
        </div>

        <div className="form-group">
          <label htmlFor="referenceCode">GCash Reference Code</label>
          <input
            type="text"
            id="referenceCode"
            value={referenceCode}
            onChange={(e) => setReferenceCode(e.target.value)}
            placeholder="Enter reference code"
            maxLength="12"
          />
        </div>

        <button type="submit" onClick={handleConfirmReceipt} className="payment-button">
          Pay Now
        </button>

        {isReceiptVisible && (
          <CustomerReservationReceipt
            reservationId={reservationId}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerReservationPayment;