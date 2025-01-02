import React, { useEffect, useState } from 'react';
import OrderItem from '../OrderItem/OrderItem';
import './OrderList.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/employee-orders');

        if (!response.ok) {
          // Handle non-200 response
          console.error('Error fetching orders, status:', response.status);
          const errorText = await response.text();
          console.error('Response was:', errorText);
          return;
        }

        const data = await response.json(); // Try to parse the response as JSON
        console.log(data); // Check the structure of the fetched data
        setOrders(data); // Set the orders in the state
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
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
              dineInOrders.map(order => {
                console.log('Order:', order); // Check structure of order
                console.log('Items:', order.items); // Check structure of items
                return (
                  <OrderItem
                    key={order.orderid}
                    orderid={order.orderid}
                    items={order.items || []} // Default to an empty array if items is undefined
                  />
                );
              })
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
                  key={order.orderid}
                  orderid={order.orderid}
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
                  key={order.orderid}
                  orderid={order.orderid}
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
