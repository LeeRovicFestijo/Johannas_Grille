import React, { useState } from 'react';
import { menu_list } from '../../../../assets/assets';
import './OrderCart.css';
const OrderCart = ({ category, setCategory, cartItems = []}) => {

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    const [selectedCategory, setSelectedCategory] = useState('');
    const categories = ["Appetizer", "Main Course", "Dessert", "Drink"]; // Adjust according to your items

    // Filter menu items based on selected category
    const filteredItems = selectedCategory
        ? menu_list.filter(item => item.category === selectedCategory)
        : menu_list;

    return (
        <div className="em-product-menu">
            <h1>Product</h1>
            <div className="emp-product-menu-list">
                {filteredItems.map((item, index) => (
                    <div
                        onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
                        key={index}
                        className='emp-explore-menu-list-item'
                    >
                        <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt='' />
                        <p>{item.menu_name}</p>
                    </div>
                ))}
            </div>
            <div className="em-ordercart">
                <h2>Cart</h2>
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index}>{item.name} - ${item.price.toFixed(2)}</li>
                    ))}
                </ul>
                <p>Total: ${total.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default OrderCart;
