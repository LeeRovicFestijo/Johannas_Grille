import React, { useState } from "react";
import "./ReservationPopup.css"; // Assuming you have a CSS file

const ReservationPopup = ({ dataItem, onClose }) => {
  const [formData, setFormData] = useState({
    productName: dataItem?.name || "",
    status: dataItem?.status || "pending",
    amount: dataItem?.amount || 0,
  });

  if (!dataItem) {
    return null; // This will hide the modal if no data is available
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle saving logic
    console.log("Order updated", formData);
    onClose(); // Close the modal after submission
  };

  return (
    <div className="tra-modal">
      <div className="tra-modal-content">
        <h2>Edit Order</h2>
        <form className="forms" onSubmit={handleSubmit}>

          <label>Product Name:
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
          />
          </label>
          <label>Status:</label>
          <select
            type="text"
            name="productName"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="pending">Pending</option>
            <option value="delivered">Delivered</option>
            <option value="canceled">Canceled</option>
          </select>
          <label>Amount:
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
          />
          </label>

          <div className="tra-modal-actions">
            <button type="submit" className="tra-save-btn">Save</button>
            <button type="button" className="tra-cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationPopup;
