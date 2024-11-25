import React, { useState, useEffect } from 'react';
import './ProductCard.css';

const FoodItem = ({ id, name, prices, image, onAddToOrder, orderId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  const handleAddToOrder = async () => {
    setLoading(true);
    setError(null);
  
    const requestBody = {
      orderid: orderId, // Pass null if no orderId
      menuitemid: id,
      quantity: 1,
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
    <div className="food-card">
      <div className="food-card-img-container">
        <img className="food-card-image" src={image} alt={name} loading="lazy"/>
      </div>
      <div className="food-card-info">
        <div className="food-card-name-rating">
          <h4>{name}</h4>
          <p>₱{prices}</p>
        </div>
        <button 
          className="btn-cart" 
          onClick={handleAddToOrder}>Add to Cart
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default FoodItem;
