import { useState } from 'react';
import './CustomerReservationPayment.css';
import { IoIosCloseCircleOutline } from "react-icons/io";
import CustomerReservationReceipt from './CustomerReservationReceipt';

const CustomerReservationPayment = ({ onClose }) => {
  const [gcashNumber, setGcashNumber] = useState('');
  const [referenceCode, setReferenceCode] = useState('');
  const [IsReceipt, setIsReceipt] = useState(false);


  const handleConfirmReceipt = () => {
    setIsReceipt(true);
  };

  return (
    <div className="payment-popup">
      <div className="payment-popup-content">
        {/* Close button */}
        <button className="payment-popup-close" onClick={onClose}><IoIosCloseCircleOutline/></button>

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

          <button type="submit" onClick={handleConfirmReceipt} className="payment-button"> Pay Now
          </button>
          {IsReceipt && (
          <CustomerReservationReceipt
          onClose={onClose} // Pass onClose down here to handle the close action properly
        />

        )}
      </div>
    </div>
  );
};

export default CustomerReservationPayment;