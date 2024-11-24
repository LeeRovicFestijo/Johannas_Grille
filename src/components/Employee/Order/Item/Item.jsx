import React, { useState, useEffect } from 'react';
import './Item.css';
import { IoMdAddCircleOutline } from "react-icons/io";

const FoodItem = ({ id, name, price, description, image, category, onAddToOrder, orderId }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [currentOrderId, setCurrentOrderId] = useState(localStorage.getItem('currentOrderId'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Function to handle adding items to the order
  const handleAddToOrder = async () => {
    setLoading(true);
    setError(null);
  
    const requestBody = {
      orderid: orderId, // Pass null if no orderId
      menuitemid: id,
      quantity: 1,
      price: price,
    };
  
    // Log the JSON body to the console
    console.log('Request Body:', JSON.stringify(requestBody));
  
    try {
      const itemResponse = await fetch('https://localhost/api/orderitems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
  
      if (itemResponse.ok) {
        const itemData = await itemResponse.json();
        console.log('Item added to order:', itemData);
        if (onAddToOrder) {
          onAddToOrder(itemData);
        }
      } else {
        throw new Error('Failed to add item to order');
      }
    } catch (error) {
      console.error('Error adding item to order:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch menu items data on component mount
  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://localhost/api/menuitems');
      if (response.ok) {
        const data = await response.json();
        setMenuItems(data);
      } else {
        throw new Error('Error fetching menu items');
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  return (
    <div className="emp-menu-container">
      <div className="emp-item-food-card">
        <div className="emp-item-food-card-img-container">
          <img
            className="emp-item-food-card-image object-contain w-full rounded-3xl aspect-[1.13]"
            src={image}
            alt={name}
            loading="lazy"
          />
        </div>
        <div className="emp-item-food-card-info">
          <div className="emp-item-food-card-name-rating">
            <h3 className="emp-product-name">{name}</h3>
            <p className="emp-product-price">₱{price}</p>
          </div>
        </div>
        <div className="emp-edit-delete-container">
          <button onClick={handleAddToOrder} className="emp-item-btn-cart add-button" disabled={loading}>
            <IoMdAddCircleOutline size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;