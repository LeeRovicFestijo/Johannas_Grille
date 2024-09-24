import React from 'react';
import OrderItem from '../OrderItem/OrderItem';
import './OrderList.css'

const orders_no = [
  { id: 345, status: 'completed' },
  { id: 346, status: 'canceled' },
  { id: 347, status: 'completed' },
  { id: 348, status: 'completed' },
  { id: 349, status: 'completed' },
  { id: 350, status: 'canceled' },
  { id: 351, status: 'pending' },
  { id: 352, status: 'completed' },
  { id: 353, status: 'completed' },
  { id: 354, status: 'queued' },
];

const orders = [
  {
    id: 351,
    date: '23 Feb 2021, 07:28 PM',
    items: [
      { name: 'Vegetable Mixups', price: '₱5.30', qty: 1 },
      { name: 'Prawn Mix Salad', price: '₱10.60', qty: 1 }
    ],
    total: '₱10.60',
    status: 'Completed'
  },
  {
    id: 351,
    date: '23 Feb 2021, 07:28 PM',
    items: [
      { name: 'Vegetable Mixups', price: '₱5.30', qty: 1 },
      { name: 'Prawn Mix Salad', price: '₱10.60', qty: 1 }
    ],
    total: '₱10.60',
    status: 'Completed'
  },
  {
    id: 351,
    date: '23 Feb 2021, 07:28 PM',
    items: [
      { name: 'Vegetable Mixups', price: '₱5.30', qty: 1 },
      { name: 'Prawn Mix Salad', price: '₱10.60', qty: 1 }
    ],
    total: '₱10.60',
    status: 'Completed'
  },
  {
    id: 351,
    date: '23 Feb 2021, 07:28 PM',
    items: [
      { name: 'Vegetable Mixups', price: '₱5.30', qty: 1 },
      { name: 'Prawn Mix Salad', price: '₱10.60', qty: 1 }
    ],
    total: '₱10.60',
    status: 'Completed'
  },
  {
    id: 351,
    date: '23 Feb 2021, 07:28 PM',
    items: [
      { name: 'Vegetable Mixups', price: '₱5.30', qty: 1 },
      { name: 'Prawn Mix Salad', price: '₱10.60', qty: 1 }
    ],
    total: '₱10.60',
    status: 'Completed'
  },
  {
    id: 351,
    date: '23 Feb 2021, 07:28 PM',
    items: [
      { name: 'Vegetable Mixups', price: '₱5.30', qty: 1 },
      { name: 'Prawn Mix Salad', price: '₱10.60', qty: 1 }
    ],
    total: '₱10.60',
    status: 'Completed'
  }
];

const OrderList = () => {
  return (
    <div className="em-container">
      <div className="em-no-button">
          <div className="em-order-button">
            {orders_no.map((order) => (
              <div key={order.id} className={`em-order-box ${order.status}`}>
                <span>#{order.id}</span>
              </div>
            ))}
          </div>
        </div>
      <div className="em-order-list">
        <div className="em-orders">
          {orders.map(order => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderList;
