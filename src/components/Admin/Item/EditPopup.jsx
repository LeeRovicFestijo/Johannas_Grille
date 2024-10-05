import React, { useState, useEffect } from 'react';
import './EditPopup.css';

const EditPopup = ({ productId, onClose, onSave }) => {
  const [updatedName, setUpdatedName] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [updatedCategory, setUpdatedCategory] = useState('');
  const [updatedImage, setUpdatedImage] = useState(null); // File to upload
  const [imagePreview, setImagePreview] = useState(''); // Image URL preview
  const [categories, setCategories] = useState([]); // Categories from DB

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/menuitems/${productId}`);
        if (response.ok) {
          const data = await response.json();
          setUpdatedName(data.name);
          setUpdatedPrice(data.price);
          setUpdatedCategory(data.category);
          setImagePreview(`http://localhost:3000${data.image_url}`);
        } else {
          console.error('Error fetching menu item:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching menu item:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error('Error fetching categories:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchMenuItem();
    fetchCategories();
  }, [productId]);

  const handleSave = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', updatedName);
    formData.append('price', updatedPrice);
    formData.append('category', updatedCategory);
    if (updatedImage) {
      formData.append('image', updatedImage);
    }

    try {
      const response = await fetch(`http://localhost:3000/api/menuitems/${productId}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        onSave(updatedProduct); // Pass updated product back to parent
        onClose(); // Close the popup
      } else {
        console.error('Error updating menu item:', response.statusText);
      }

    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedImage(file);
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <button onClick={onClose}>Close</button>
        <form onSubmit={handleSave}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />

          <label htmlFor="price">Price</label>
          <input
            id="price"
            type="text"
            value={updatedPrice}
            onChange={(e) => setUpdatedPrice(e.target.value)}
          />

          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={updatedCategory}
            onChange={(e) => setUpdatedCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))
            ) : (
              <option value="">No categories available</option>
            )}
          </select>

          <label htmlFor="image">Upload Image</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditPopup;
