import React from 'react';
import './CustomerReservationReceipt.css';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoHourglassOutline } from "react-icons/io5";

const CustomerReservationReceipt = ({ onClose }) => {
  return (
    <div className="receipt-popup">
      <div className="receipt-popup-content">
        {/* Close button */}
        <button className="receipt-popup-close" onClick={onClose}>
          <IoIosCloseCircleOutline/>
        </button>

        <div className="receipt-status">
          <span className="checkmark"><IoHourglassOutline/></span>
        </div>

        <p>Your reservation at Johannas Grille is pending</p>
        <p>Sat 12th Aug 3:00 PM</p>
        <p className="receipt-branch">Branch: Bauan Batangas</p>

        <div className="receipt-details">
          <div className="order-option">
            <span>Pax: 50</span>
          </div>
        </div>

        <h3>Package</h3>
        <table className="package-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Babyback Ribs</td>
              <td>2</td>
              <td>P1000.00</td>
            </tr>
            <tr>
              <td>Seafood Paella Fried Rice</td>
              <td>3</td>
              <td>P2400.00</td>
            </tr>
            <tr>
              <td colSpan="2" className="total-label">Total</td>
              <td>P3400.00</td>
            </tr>
          </tbody>
        </table>

        <h3>Terms & Conditions</h3>
        <p className="terms">
          RESTAURANT:
          <br /> NO CANCELLATION AND NO REFUND
        </p>
      </div>
    </div>
  );
};

export default CustomerReservationReceipt;