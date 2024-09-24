import React from 'react';
import './DeletePopup.css';

const DeletePopup = ({ name, price, image, onClose, onDelete }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(); // Call the delete function passed from the parent component
    onClose(); // Close the popup after deletion
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={onClose}>Close</button>
        <h3>Are you sure you want to delete this item?</h3>
        <div className="delete-item-info">
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Price:</strong> {price}</p>
          <div className="image-preview">
            <img src={image} alt="Item Preview" />
          </div>
        </div>
        <div className="delete-popup-buttons">
          <button className="confirm-btn" onClick={handleDelete}>Delete</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;