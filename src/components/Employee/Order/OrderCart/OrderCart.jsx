import React, { useState, useEffect } from 'react';
import { menu_list } from '../../../../assets/assets';
import OrderItem from '../OrderItem';
import PlaceOrderPopup from '../PlaceOrderPopup/PlaceOrderPopup';
import './OrderCart.css';

const OrderCart = ({ category, setCategory, orderId }) => {
    const [orderItems, setOrderItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPlaceOrderPopup, setShowPlaceOrderPopup] = useState(false);
    const [orderType, setOrderType] = useState('Dine In'); // Default to "Dine In"

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

        fetchOrderItems();
    }); // Dependency array ensures this runs when `orderId` changes

    const handleAddToOrder = async (menuItemId) => {
        try {
            const response = await fetch('http://localhost:3000/api/orderitems', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderid: orderId,
                    menuitemid: menuItemId,
                    quantity: 1,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add item to order');
            }

            const itemData = await response.json();
            setOrderItems((prevItems) => [...prevItems, itemData]);
        } catch (error) {
            console.error('Error adding item to order:', error);
            setError(error.message);
        }
    };

    const handlePlaceOrder = () => {
        setShowPlaceOrderPopup(true);
    };

    const handleConfirmOrder = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/confirm-order/${orderId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderType }),
            });

            if (!response.ok) throw new Error('Order confirmation failed.');

            const result = await response.json();
            alert(`Order placed successfully! Order ID: ${result.orderId}`);
            setShowPlaceOrderPopup(false);
            setOrderItems([]); // Clear the cart after placing the order
        } catch (error) {
            console.error('Error confirming order:', error);
            alert('Failed to place order.');
        }
    };

    return (
        <div className="em-product-menu">
            <h1 className="menu-title">Product Menu</h1>
            <div className="emp-product-menu-list">
                {menu_list.map((item, index) => (
                    <div
                        onClick={() => {
                            setCategory((prev) => (prev === item.menu_name ? 'All' : item.menu_name));
                            handleAddToOrder(item.id);
                        }}
                        key={index}
                        className="emp-explore-menu-list-item"
                    >
                        <img
                            className={category === item.menu_name ? 'active' : ''}
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
                <div className="order-type">
                    <label>
                        <input
                            type="radio"
                            name="orderType"
                            value="Dine In"
                            checked={orderType === 'Dine In'}
                            onChange={(e) => setOrderType(e.target.value)}
                        />
                        Dine In
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="orderType"
                            value="Takeout"
                            checked={orderType === 'Takeout'}
                            onChange={(e) => setOrderType(e.target.value)}
                        />
                        Takeout
                    </label>
                </div>
                <div>
                    {orderItems.length > 0 ? (
                        orderItems.map((item) => (
                            <OrderItem key={item.orderitemid} item={item} order={orderId} />
                            
                        ))
                    ) : (
                        <div>No items in your order.</div>
                    )}
                </div>
                <div className="em-order-placeorder">
                    <button onClick={handlePlaceOrder}>Place Order</button>
                </div>
            </div>
            {showPlaceOrderPopup && (
                <PlaceOrderPopup
                    orderItems={orderItems}
                    orderType={orderType} // Passing orderType to PlaceOrderPopup
                    onCancel={() => setShowPlaceOrderPopup(false)}
                    onConfirm={handleConfirmOrder}
                />
            )}
        </div>
    );
};

export default OrderCart;
