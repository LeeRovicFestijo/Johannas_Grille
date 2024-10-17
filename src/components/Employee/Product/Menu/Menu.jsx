import React, { useState } from 'react'
import './Menu.css'
import { menu_list } from '../../../../assets/assets'

const Menu = ({category,setCategory}) => {
  
  return (
    <div className="em-product-menu" id="em-product-menu">
      <h1>Product</h1>
      <p className="em-product-menu-description">{/* Description here */}</p>

      <div className="em-product-menu-list">
        {menu_list.map((item, index) => (
          <div
            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
            key={index}
            className="em-product-menu-item"
          >
            <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}

export default Menu
