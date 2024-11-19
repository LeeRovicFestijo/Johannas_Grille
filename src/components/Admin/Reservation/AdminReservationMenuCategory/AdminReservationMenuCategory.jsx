import React, { useState } from "react";
import "./AdminReservationMenuCategory.css"; // Assuming you have a CSS file
import { res_list } from '../../../../assets/assets';

const AdminReservationMenuCategory = ({ category, setCategory }) => {

  return (
    <div className="admin-product-menu-list">
            {res_list.map((item,index)=> {
          return (
            <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}key={index} className='explore-menu-list-item'> 
              <img className={category===item.menu_name?"active":""}src={item.menu_image} alt=''/>
              <p>{item.menu_name}</p>
            </div>
          )
        })}
        </div>
  );
};

export default AdminReservationMenuCategory;
