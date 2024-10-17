import React, { useState, useEffect } from 'react';
import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const [foodList, setFoodList] = useState([]);

    useEffect(() => {
      // Fetch data from the API
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/menuitems'); // Adjust the port accordingly
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setFoodList(data);
        } catch (error) {
          console.error('Error fetching food items:', error);
        }
      };

      fetchData();
    }, []);   

  return (
    <div className='food-display' id='food-display'>
      <h2>Menu</h2>
      <div className="food-display-list">
        {foodList.map((item) => {
          // Check if the item category matches and if the name has already been displayed
          if ((category === "All" || category === item.category)) {

            return (
              <FoodItem 
                key={item.menuitemid} // Use a unique key
                id={item.menuitemid} 
                name={item.name} 
                image={`http://localhost:3000${item.image_url}`}// Use the correct field for the image URL
                prices={item.price}
              />
            );
          }
          return null; // Return null if the category does not match or name already displayed
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;

