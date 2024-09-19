import React, { useContext } from 'react'
import './ItemDisplay.css'
import { food_list } from "../../../assets/assets";
import Item from '../Item/Item'

const ItemDisplay = ({category}) => {

  return (
    <div className='item-food-display' id='food-display'>
      <div className="item-food-display-list">
        {food_list.map((item,index)=> {
          if (category==="All" || category===item.category) {
            return <Item key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
          }
        })}
      </div>
    </div>
  )
}

export default ItemDisplay;
