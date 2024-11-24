import React, { useState, useEffect } from 'react';
import './Item.css';
import EditPopup from './EditPopup';
import DeletePopup from './DeletePopup';
// Importing the icons for edit and delete
import { MdDeleteOutline } from "react-icons/md";
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
      const response = await fetch('https://localhost/api/menuitems'); // Adjust this to your API URL
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
      const response = await fetch('https://localhost/api/menuitems');
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

  const handleEditClick = () => {
    setShowEditPopup(true);
  };

  const handleDeleteClick = () => {
    setShowDeletePopup(true);
  };

  const handleClosePopup = () => {
    setShowEditPopup(false);
    setShowDeletePopup(false);
  };

  const handleUpdate = () => {
    fetchMenuItems(); // Refresh the menu em-items list
  };

  const handleSave = (updatedData) => {
    setFoodName(updatedData.updatedName);
    setFoodPrice(updatedData.updatedPrice);
    if (updatedData.updatedImage) {
      setFoodImage(URL.createObjectURL(updatedData.updatedImage));
    }
    fetchData(); // Reload data after saving
  };

  return (
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
          {/* Edit Icon Button */}
          <button className="em-item-btn-cart" onClick={handleEditClick}>
            <RiEditLine size={25} />
          </button>
          {/* Delete Icon Button */}
          <button className="em-item-btn-cart" onClick={handleDeleteClick}>
            <MdDeleteOutline size={25} />
          </button>
        </div>
      </div>

      {showEditPopup && (
        <EditPopup productId={id} onClose={handleClosePopup} onSave={handleSave} onUpdate={handleUpdate}/>
      )}

      {showDeletePopup && (
        <DeletePopup productId={id} onClose={handleClosePopup} onDelete={fetchData} />
      )}
    </div>
  );
};

export default FoodItem;
