import React, { useState } from 'react';
import './Item.css';
import EditPopup from './EditPopup';
import DeletePopup from './DeletePopup';
// Importing the FaRegEdit (edit icon with pencil inside a square) from react-icons
import { MdDeleteOutline } from "react-icons/md";
import { RiEditLine } from "react-icons/ri";


const FoodItem = ({ id, name, price, description, image }) => {
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [foodName, setFoodName] = useState(name);
  const [foodPrice, setFoodPrice] = useState(price);
  const [foodImage, setFoodImage] = useState(image);

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

  const handleDelete = () => {
    console.log(`Deleted ${foodName}`);
    setShowDeletePopup(false);
  };

  const handleSave = (updatedData) => {
    setFoodName(updatedData.updatedName);
    setFoodPrice(updatedData.updatedPrice);
    if (updatedData.updatedImage) {
      setFoodImage(URL.createObjectURL(updatedData.updatedImage));
    }
  };

  return (
    <div className="em-item-food-card">
      <div className="em-item-food-card-img-container">
        <img className="em-item-food-card-image" src={foodImage} alt={foodName} />
      </div>
      <div className="em-item-food-card-info">
        <div className="em-item-food-card-name-rating">
          <p>{name}</p>
        </div>
      </div>
      <div className="em-edit-delete-container">
        <div className="em-edit-btn">
          {/* Edit Icon Button using FaRegEdit */}
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
        <EditPopup
          name={foodName}
          price={foodPrice}
          image={foodImage}
          onClose={handleClosePopup}
          onSave={handleSave}
        />
      )}

      {showDeletePopup && (
        <DeletePopup
          name={foodName}
          price={foodPrice}
          image={foodImage}
          onClose={handleClosePopup}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default FoodItem;