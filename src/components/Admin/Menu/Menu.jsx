import React, { useState } from 'react';
import './Menu.css';
import { menu_list } from '../../../assets/assets';

const Menu = ({ category, setCategory }) => {
  const [showPopup, setShowPopup] = useState(false); // Controls popup visibility
  const [productName, setProductName] = useState(''); // Track product name
  const [price, setPrice] = useState(''); // Track price
  const [selectedCategory, setSelectedCategory] = useState(''); // Track selected category
  const [image, setImage] = useState(null); // Track image file

  const categories = ["Appetizer", "Must", "House", "Party", "Dessert", "Drink"]; // Dropdown options

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, such as sending data to the server
    console.log({
      productName,
      price,
      selectedCategory,
      image,
    });
    setShowPopup(false); // Close the popup after submitting
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="admin-product-menu" id="admin-product-menu">
      <h1>Product</h1>
      <p className="admin-product-menu-description">{/* Description here */}</p>

      <button className="admin-add-product-button" onClick={() => setShowPopup(true)}>
        Add Products
      </button>

      {/* Conditionally render the popup */}
      {showPopup && (
        <div className="admin-popup-form">
          <div className="admin-popup-content">
            <h2>Add New Product</h2>
            <form onSubmit={handleFormSubmit}>
              <label>Product Name:</label>
              <input
                type="text"
                placeholder="Enter product name"
                className="admin-popup-input"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />

              <label>Price:</label>
              <input
                type="number"
                placeholder="Enter product price"
                className="admin-popup-input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />

              <label>Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="admin-popup-input"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <label>Upload Image:</label>
              <input
                type="file"
                className="admin-popup-input"
                onChange={handleImageChange}
                required
              />

              <button type="submit" className="admin-popup-button">Submit</button>
              <button type="button" className="admin-popup-button cancel" onClick={() => setShowPopup(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      <div className="admin-product-menu-list">
        {menu_list.map((item, index) => (
          <div
            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
            key={index}
            className="admin-product-menu-item"
          >
            <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}

export default Menu;