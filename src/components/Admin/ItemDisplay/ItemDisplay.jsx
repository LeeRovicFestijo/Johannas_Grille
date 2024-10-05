import React from 'react';
import './ItemDisplay.css';
import Item from '../Item/Item';

const ItemDisplay = ({ category, items }) => {
  return (
    <div className='item-food-display' id='food-display'>
      <div className="item-food-display-list">
        {items.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <Item 
                key={index} 
                id={item.menuitemid} 
                name={item.name} 
                price={item.price} 
                image={`http://localhost:3000${item.image_url}`}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default ItemDisplay;
