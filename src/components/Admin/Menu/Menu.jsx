import React from 'react'
import './Menu.css'
import { menu_list } from '../../../assets/assets'

const Menu = ({category,setCategory}) => {
  return (
    <div className="admin-explore-menu" id="admin-explore-menu">
      <h1>Product</h1>
      <p className="admin-explore-menu-text">{/*Lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor*/}</p>
      <div className="admin-explore-menu-list">
        {menu_list.map((item,index)=> {
          return (
            <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}key={index} className='admin-explore-menu-list-item'> 
              <img className={category===item.menu_name?"active":""}src={item.menu_image} alt=''/>
              <p>{item.menu_name}</p>
            </div>
          )
        })}
      </div>
      < hr/>
    </div>
  )
}

export default Menu
