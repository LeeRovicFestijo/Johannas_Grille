import React from 'react';
import OrderItem from '../OrderItem/OrderItem';
import './OrderList.css';

const orders = [
  {
    id: 351,
    date: '23 Feb 2021, 07:28 PM',
    items: [
      { name: 'Vegetable Mixups', price: '₱5.30', qty: 1 },
      { name: 'Prawn Mix Salad', price: '₱10.60', qty: 1 }
    ],
    total: '₱10.60',
    status: 'Completed',
    type: 'Dine-in'  // Order type
  },
  {
    id: 352,
    date: '23 Feb 2021, 08:00 PM',
    items: [
      { name: 'Burger', price: '₱8.50', qty: 1 }
    ],
    total: '₱8.50',
    status: 'Completed',
    type: 'Take-out'
  },
  {
    id: 353,
    date: '23 Feb 2021, 08:15 PM',
    items: [
      { name: 'Pizza', price: '₱15.00', qty: 1 }
    ],
    total: '₱15.00',
    status: 'Completed',
    type: 'Pick-up'
  },
  {
    id: 354,
    date: '23 Feb 2021, 07:28 PM',
    items: [
      { name: 'Vegetable Mixups', price: '₱5.30', qty: 1 },
      { name: 'Prawn Mix Salad', price: '₱10.60', qty: 1 }
    ],
    total: '₱10.60',
    status: 'Completed',
    type: 'Dine-in'  // Order type
  },
  {
    id: 355,
    date: '23 Feb 2021, 08:00 PM',
    items: [
      { name: 'Burger', price: '₱8.50', qty: 1 }
    ],
    total: '₱8.50',
    status: 'Completed',
    type: 'Take-out'
  },
  {
    id: 356,
    date: '23 Feb 2021, 08:15 PM',
    items: [
      { name: 'Pizza', price: '₱15.00', qty: 1 }
    ],
    total: '₱15.00',
    status: 'Completed',
    type: 'Pick-up'
  }
];

const OrderList = () => {
  const dineInOrders = orders.filter(order => order.type === 'Dine-in');
  const takeOutOrders = orders.filter(order => order.type === 'Take-out');
  const pickUpOrders = orders.filter(order => order.type === 'Pick-up');

  return (
    <div className="em-container">
      <div className="em-columns">
        {/* Dine-in Column */}
        <div className="em-column">
          <h2>Dine-in Orders</h2>
          <div className="em-orders">
            {dineInOrders.map(order => (
              <OrderItem key={order.id} order={order} />
            ))}
          </div>
        </div>

        {/* Take-out Column */}
        <div className="em-column">
          <h2>Take-out Orders</h2>
          <div className="em-orders">
            {takeOutOrders.map(order => (
              <OrderItem key={order.id} order={order} />
            ))}
          </div>
        </div>

        {/* Pick-up Column */}
        <div className="em-column">
          <h2>Pick-up Orders</h2>
          <div className="em-orders">
            {pickUpOrders.map(order => (
              <OrderItem key={order.id} order={order} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
