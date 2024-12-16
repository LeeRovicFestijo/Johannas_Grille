import React, { useEffect, useState } from 'react';
import OrderItem from '../OrderItem/OrderItem';
import './OrderList.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/employee-orders'); // Fetch orders from backend
        const data = await response.json(); // Parse JSON response
        setOrders(data); // Update state with fetched orders
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders(); // Trigger the fetch operation
  }, []);

  // Filter orders based on their type and ensure they're 'Pending'
  const pendingOrders = orders.filter(order => order.status === 'Pending');

  const dineInOrders = pendingOrders.filter(order => order.type === 'Dine-in');
  const takeOutOrders = pendingOrders.filter(order => order.type === 'Take-out');
  const pickUpOrders = pendingOrders.filter(order => order.type === 'Pick-up');

  return (
    <div className="em-container">
      <div className="em-columns">
        <div className="em-column">
          <h2>Dine-in Orders</h2>
          <div className="em-orders">
            {dineInOrders.length > 0 ? (
              dineInOrders.map(order => (
                <OrderItem
                  key={order.id}
                  orderid={order.id}
                  items={order.items} // Pass the list of items
                />
              ))
            ) : (
              <p>No dine-in orders available.</p>
            )}
          </div>
        </div>

        <div className="em-column">
          <h2>Take-out Orders</h2>
          <div className="em-orders">
            {takeOutOrders.length > 0 ? (
              takeOutOrders.map(order => (
                <OrderItem
                  key={order.id}
                  orderid={order.id}
                  items={order.items} // Pass the list of items
                />
              ))
            ) : (
              <p>No take-out orders available.</p>
            )}
          </div>
        </div>

        <div className="em-column">
          <h2>Pick-up Orders</h2>
          <div className="em-orders">
            {pickUpOrders.length > 0 ? (
              pickUpOrders.map(order => (
                <OrderItem
                  key={order.id}
                  orderid={order.id}
                  items={order.items} // Pass the list of items
                />
              ))
            ) : (
              <p>No pick-up orders available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
