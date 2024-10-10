import React, { useEffect, useState } from 'react';
import './ItemDisplay.css';
import Item from '../Item/Item';

const ItemDisplay = ({ category, items }) => {
  const [displayedItems, setDisplayedItems] = useState([]);

  useEffect(() => {
    // Reset displayedNames and filter items based on category
    const displayedNames = new Set();
    const filteredItems = items.filter(item => {
      return (category === "All" || category === item.category) && !displayedNames.has(item.name);
    });

    // Add filtered names to displayedNames to ensure uniqueness
    filteredItems.forEach(item => displayedNames.add(item.name));

    // Update state with filtered items
    setDisplayedItems(filteredItems);
  }, [category, items]); // Run effect when category or items change

  return (
    <div className='item-food-display' id='food-display'>
      <div className="item-food-display-list">
        {displayedItems.map((item, index) => (
          <Item 
            key={index} 
            id={item.menuitemid} 
            name={item.name} 
            price={item.price} 
            image={`http://localhost:3000${item.image_url}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemDisplay;
  