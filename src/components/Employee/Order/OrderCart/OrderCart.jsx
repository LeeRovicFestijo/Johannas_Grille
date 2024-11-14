import React, { useState, useEffect } from 'react';
import { menu_list } from '../../../../assets/assets';
import './OrderCart.css';

const OrderCart = ({ category, setCategory, cartItems = [], orderId }) => {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchOrderItems = async () => {
            if (!orderId) return;
            try {
                const response = await fetch('http://localhost:3000/api/order/${orderId}',);
                const data = await response.json(); setOrderItems(data);
            }
            catch (error) { console.error('Error fetching order items:', error); }
        };

        fetchOrderItems();
    },);

    // Function to update the item quantity in the database const updateQuantityInDb = async (orderitem_id, action) => { try { await fetch(http://localhost:3000/api/order/${action}/${orderitem_id}, { method: 'POST', }); } catch (error) { console.error('Error updating item quantity:', error); } };

    // Handlers for increasing and decreasing quantity const handleIncreaseQuantity = async (orderitem_id) => { setOrderItems((prevItems) => prevItems.map(item => item.orderitem_id === orderitem_id ? { ...item, quantity: item.quantity + 1 } : item ) ); await updateQuantityInDb(orderitem_id, 'increase'); };

    // Calculate subtotal, tax, and total const subtotal = orderItems.reduce( (total, item) => total + parseFloat(item.price) * item.quantity, 0 ); const taxRate = 0.12; const tax = subtotal * taxRate; const total = subtotal + tax;

    // Handle selecting a payment method const handlePaymentMethodChange = (method) => { setSelectedPaymentMethod(method); if (method === 'Cash') { setShowCashModal(true); // Show modal if Cash is selected } else { setShowCashModal(false); } };

    // Handle selecting dine-in or takeout option const handleDineOptionChange = (event) => { setDineOption(event.target.value); };


    const handleDecreaseQuantity = async (orderitem_id) => { 
        setOrderItems((prevItems) => prevItems.map(item => item.orderitem_id === orderitem_id ? 
            { ...item, quantity: item.quantity - 1 } : item)); await updateQuantityInDb(orderitem_id, 'decrease'); };

    // Filter menu items based on selected category
    const filteredItems = selectedCategory
        ? menu_list.filter(item => item.category === selectedCategory)
        : menu_list;


    return (
        <div className="em-product-menu">
            <h1 className="menu-title">Product Menu</h1>
            <div className="emp-product-menu-list">
                {filteredItems.map((item, index) => (
                    <div
                        onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
                        key={index}
                        className='emp-explore-menu-list-item'
                    >
                        <img
                            className={category === item.menu_name ? "active" : ""}
                            src={item.menu_image}
                            alt={item.menu_name}
                        />
                        <p>{item.menu_name}</p>
                    </div>
                ))}
            </div>
            <div className="em-ordercart">
                <h2>Cart</h2>
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index} className="cart-item">
                            <span>{item.name}</span>
                            <span>${item.price.toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
                <div className="cart-total">
                    <span></span>
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                <button>Add to Order</button>
            </div>
        </div>
    );
};

export default OrderCart;