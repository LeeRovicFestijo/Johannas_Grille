import React, { useState } from 'react';
import './EditPopup.css';

const EditPopup = ({ name, price, image, onClose, onSave }) => {
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedPrice, setUpdatedPrice] = useState(price);
  const [updatedImage, setUpdatedImage] = useState(image);
  const [imagePreview, setImagePreview] = useState(image); // To preview the uploaded image

  const handleSave = (e) => {
    e.preventDefault();
    // Call the parent component's onSave function
    onSave({ updatedName, updatedPrice, updatedImage });
    onClose(); // Close the popup after saving
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedImage(file); // Store the file itself
        setImagePreview(reader.result); // Show the image preview
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <button onClick={onClose}>Close</button>
        <form onSubmit={handleSave}>
          {/* Name Field */}
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />

          {/* Price Field */}
          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="text"
            value={updatedPrice}
            onChange={(e) => setUpdatedPrice(e.target.value)}
          />

          {/* Image Upload Field */}
          <label htmlFor="image">Upload Image</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          {/* Image Preview */}
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}

          {/* Save Button */}
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditPopup;