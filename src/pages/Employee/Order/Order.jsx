import React, { useState } from 'react';
import Sidebar from '../../../components/Employee/Sidebar/Sidebar';
import Header from '../../../components/Employee/Header/Header';
import ItemDisplay from '../../../components/Employee/Order/ItemDisplay/ItemDisplay';
import OrderCart from '../../../components/Employee/Order/OrderCart/OrderCart';
import './Order.css';

let orderCounter = 1021; // Static counter to track order IDs

const EmployeeOrder = () => {
  const [category, setCategory] = useState("All");
  const [orderId, setOrderId] = useState(orderCounter); // Start order ID at 1000

  const createNewOrder = () => {
    orderCounter += 1; // Increment order counter
    setOrderId(orderCounter); // Set new order ID
  };

  return (
    <div>
      <Sidebar />
      <div className="em-main-content">
        <Header />
        <button onClick={createNewOrder} className="create-order-button">Create New Order</button>
        <OrderCart category={category} setCategory={setCategory} orderId={orderId} />
        <ItemDisplay category={category} orderId={orderId} /> {/* Pass orderId to ItemDisplay */}
      </div>
    </div>
  );
}

export default EmployeeOrder;