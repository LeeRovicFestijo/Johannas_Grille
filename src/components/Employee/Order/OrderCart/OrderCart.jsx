import React, { useState, useEffect } from 'react';
import { menu_list } from '../../../../assets/assets';
import OrderItem from '../OrderItem';
import './OrderCart.css';

const OrderCart = ({ category, setCategory, orderId }) => {
    const [orderItems, setOrderItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderItems = async () => {
            if (!orderId) return;
            try {
                const response = await fetch(`http://localhost:3000/api/order/${orderId}`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const data = await response.json();
                setOrderItems(data);
            } catch (error) {
                console.error('Error fetching order items:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (orderId) {
            fetchOrderItems();
        }
    }); // Dependency array added to refetch when orderId changes

    const handleAddToOrder = async (menuItemId) => {
        try {
            const response = await fetch('http://localhost:3000/api/orderitems', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderid: orderId,
                    menuitemid: menuItemId,
                    quantity: 1, // Assuming default quantity is 1, adjust as needed
                    // You can add other fields like price if necessary
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add item to order');
            }

            const itemData = await response.json();
            setOrderItems(prevItems => [...prevItems, itemData]);
        } catch (error) {
            console.error('Error adding item to order:', error);
            setError(error.message);
        }
    };

    return (
        <div className="em-product-menu">
            <h1 className="menu-title">Product Menu</h1>
            <div className="emp-product-menu-list">
                {menu_list.map((item, index) => (
                    <div
                        onClick={() => {
                            setCategory(prev => prev === item.menu_name ? "All" : item.menu_name);
                            handleAddToOrder(item.id);
                        }}
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
                <div className="order-id">
                    <h6>Order ID: {orderId}</h6>
                </div>
                <div className="flex flex-col px-4 py-4 mt-6 font-semibold bg-white border-t border-b border-zinc-400">
                    {orderItems.length > 0 ? (
                        orderItems.map((item) => (
                            <OrderItem key={item.orderitemid} item={item} order={orderId} />
                        ))
                    ) : (
                        <div>No items in your order.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderCart;
