import React from 'react';

function OrderItem({ item, increaseQuantity, decreaseQuantity }) {
  return (
    <div className="order-item">
      <span>{item.name}</span> ₱{item.price}
      <div className="quantity-controls">
        <button
          onClick={decreaseQuantity}
          className="px-2 py-1 text-lg font-bold bg-gray-200 rounded"
        >
          -
        </button>
        <span className="px-2">{item.quantity}</span>
        <button
          onClick={increaseQuantity}
          className="px-2 py-1 text-lg font-bold bg-gray-200 rounded"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default OrderItem;
