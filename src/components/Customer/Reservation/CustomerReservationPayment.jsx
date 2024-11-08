import { useState } from 'react';
import './CustomerReservationPayment.css';
import { IoIosCloseCircleOutline } from "react-icons/io";

const CustomerReservationPayment = ({ onPaymentComplete, onClose }) => {
  const [gcashNumber, setGcashNumber] = useState('');
  const [referenceCode, setReferenceCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!gcashNumber || !referenceCode) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    setIsProcessing(true);

    const handleClose = () => {
        setIsPaymentPopupVisible(false); // This will close the popup
      };

    try {
      // Simulate a payment process (replace with actual payment logic)
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay

      // After payment is processed
      onPaymentComplete(); // Callback to indicate payment success
      onClose();           // Close the payment form
    } catch (error) {
      setErrorMessage('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-popup">
      <div className="payment-popup-content">
        {/* Close button */}
        <button className="payment-popup-close" onClick={onClose}><IoIosCloseCircleOutline/></button>

        <h2>GCash Payment Details</h2>

        {errorMessage && <div className="payment-error-message">{errorMessage}</div>}

        <form onSubmit={handleSubmit} className="payment-form">
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

          <button type="submit" disabled={isProcessing} className="payment-button">
            {isProcessing ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerReservationPayment;