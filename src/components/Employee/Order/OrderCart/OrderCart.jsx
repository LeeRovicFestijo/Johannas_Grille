import React, { useState, useEffect } from 'react';
import OrderItem from '../OrderItem';
import PlaceOrderPopup from '../PlaceOrderPopup/PlaceOrderPopup';
import './OrderCart.css';

const OrderCart = ({ category, setCategory, orderId }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPlaceOrderPopup, setShowPlaceOrderPopup] = useState(false);
  const [orderType, setOrderType] = useState('Dine In');

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
  });

  const updateOrder = async () => {
    const totalAmount = orderItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );

    try {
      const response = await fetch(`http://localhost:3000/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ordertype: orderType, totalamount: totalAmount }),
      });

      if (!response.ok) throw new Error('Failed to update order');

      const updatedOrder = await response.json();
      console.log('Order updated successfully:', updatedOrder);
    } catch (error) {
      console.error('Error updating order:', error.message);
      alert('Failed to update order.');
    }
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    const updatedItems = orderItems.map((item) =>
      item.orderitemid === itemId ? { ...item, quantity: newQuantity } : item
    );
    setOrderItems(updatedItems);

    if (newQuantity <= 0) {
      await handleRemoveItem(itemId);
    } else {
      await updateOrder();
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      // Call backend to delete item by orderitemid
      const response = await fetch(`http://localhost:3000/api/orderitems/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete item');

      // Remove item from the frontend state after successful deletion
      setOrderItems(orderItems.filter((item) => item.orderitemid !== itemId));
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item.');
    }
  };

  const handleConfirmOrder = async () => {
    try {
      const totalAmount = orderItems.reduce(
        (total, item) => total + item.price * (item.quantity || 1),
        0
      );
      const customerId = '0000'; // Replace with the actual customer ID

      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD
      const formattedTime = currentDate.toISOString().split('T')[1].split('.')[0]; // HH:MM:SS

      const response = await fetch(`http://localhost:3000/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: String(customerId),
          orderType,
          totalAmount,
          date: formattedDate,
          time: formattedTime,
        }),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error('Server responded with error:', errorDetails);
        throw new Error(errorDetails.message || 'Order update failed.');
      }

      const result = await response.json();
      alert(`Order updated successfully! Order ID: ${result.orderid}`);
      setShowPlaceOrderPopup(false);
      setOrderItems([]); // Clear the cart after placing the order
    } catch (error) {
      console.error('Error confirming order:', error.message);
      alert(`Failed to update order: ${error.message}`);
    }
  };

  return (
    <div className="em-product-menu">
      <h1 className="menu-title">Product Menu</h1>
      <div className="emp-product-menu-list">
        {/* Category and items rendering */}
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
              <OrderItem
                key={item.orderitemid}
                item={item}
                increaseQuantity={() => handleQuantityChange(item.orderitemid, item.quantity + 1)}
                decreaseQuantity={() =>
                  handleQuantityChange(item.orderitemid, item.quantity === 1 ? 0 : item.quantity - 1)
                }
              />
            ))
          ) : (
            <div>No items in your order.</div>
          )}
        </div>
        <div className="em-order-buttons">
          <div className="em-order-placeorder">
            <button onClick={() => setShowPlaceOrderPopup(true)}>Cash</button>
          </div>
          <div className="em-order-placeorder">
            <button >G-Cash</button>
          </div>
        </div>
      </div>
      {showPlaceOrderPopup && (
        <PlaceOrderPopup
          orderItems={orderItems}
          orderType={orderType}
          onCancel={() => setShowPlaceOrderPopup(false)}
          onConfirm={handleConfirmOrder}
        />
      )}
    </div>
  );
};

export default OrderCart;
