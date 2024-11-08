import React, { useState, useEffect } from 'react';
import './Item.css';
import { RiEditLine } from "react-icons/ri";

const FoodItem = ({ id, name, price, description, image, category }) => {
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [foodName, setFoodName] = useState(name);
  const [foodPrice, setFoodPrice] = useState(price);
  const [foodImage, setFoodImage] = useState(image);
  const [foodCategory, setFoodCategory] = useState(category);
  const [foodItems, setFoodItems] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  // Mock fetchData function to simulate fetching updated data from the server

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/menuitems'); // Adjust this to your API URL
      const data = await response.json();
      setFoodItems(data); // Update state with fetched data
      window.location.reload()
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Triggering fetchData when the component mounts
  const fetchMenuItems = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/menuitems');
      if (response.ok) {
        const data = await response.json();
        setMenuItems(data);
      } else {
        console.error('Error fetching menu em-items:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching menu em-items:', error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <div className="emp-menu-container">
      <div className="em-item-food-card">
        <div className="em-item-food-card-img-container">
          <img className="em-item-food-card-image" src={foodImage} alt={foodName} />
        </div>
        <div className="em-item-food-card-info">
          <div className="em-item-food-card-name-rating">
            <p>{foodName}</p>
          </div>
        </div>
        <div className="edit-delete-container">
          <div className="edit-btn">
            <button className="em-item-btn-cart">
              <RiEditLine size={25} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
