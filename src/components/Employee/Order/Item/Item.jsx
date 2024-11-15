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
      const itemResponse = await fetch('http://localhost:3000/api/orderitems', {
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
      const response = await fetch('http://localhost:3000/api/menuitems');
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
      <div className="em-item-food-card">
        <div className="em-item-food-card-img-container">
          <img
            className="em-item-food-card-image object-contain w-full rounded-3xl aspect-[1.13]"
            src={`http://localhost:3000/${image}`}
            alt={name}
            loading="lazy"
          />
        </div>
        <div className="em-item-food-card-info">
          <div className="em-item-food-card-name-rating">
            <h3 className="product-name">{name}</h3>
            <p className="product-price">₱{price}</p>
          </div>
        </div>
        <div className="edit-delete-container">
          <button onClick={handleAddToOrder} className="em-item-btn-cart add-button" disabled={loading}>
            <IoMdAddCircleOutline size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;