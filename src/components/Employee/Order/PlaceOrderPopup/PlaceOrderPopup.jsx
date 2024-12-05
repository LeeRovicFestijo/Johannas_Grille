import React, { useState } from 'react';
import './PlaceOrderPopup.css';

const PlaceOrderPopup = ({ orderItems, orderType, onCancel, onConfirm }) => {
    const [receivedAmount, setReceivedAmount] = useState('');
    const totalPrice = orderItems.reduce(
        (total, item) => total + (Number(item.price) || 0) * (item.quantity || 0),
        0
    );
    const totalItems = orderItems.reduce((total, item) => total + (item.quantity || 0), 0);
    const change = receivedAmount ? Math.max(0, receivedAmount - totalPrice) : 0;

    const handleReceivedAmountChange = (e) => {
        const value = parseFloat(e.target.value);
        setReceivedAmount(isNaN(value) ? '' : value);
    };

    return (
        <div className="place-order-popup">
            <div className="place-order-popup-inner">
                <h2>Confirm Your Order</h2>
                <ul className="order-items-list">
                    {orderItems.map((item) => (
                        <li key={item.orderitemid}>
                            {item.name} - Quantity: {item.quantity} - 
                            Price: ${Number(item.price) ? Number(item.price).toFixed(2) : 'N/A'}
                        </li>
                    ))}
                </ul>
                <p>Order Type: <strong>{orderType}</strong></p>
                <p>Total Items: <strong>{totalItems}</strong></p>
                <p>Total Price: <strong>${totalPrice.toFixed(2)}</strong></p>
                <div className="payment-section">
                    <label>
                        Amount Received:
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={receivedAmount}
                            onChange={handleReceivedAmountChange}
                            placeholder="Enter amount"
                        />
                    </label>
                    <p>Change: <strong>${change.toFixed(2)}</strong></p>
                </div>
                <div className="place-order-buttons">
                    <button
                        className="confirm-button"
                        onClick={() => onConfirm({ receivedAmount, change })}
                        disabled={receivedAmount < totalPrice || receivedAmount === ''}
                    >
                        Confirm Order
                    </button>
                    <button className="cancel-button" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderPopup;
