import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/Employee/Sidebar/Sidebar';
import Header from '../../../components/Employee/Header/Header';
import ItemDisplay from '../../../components/Employee/Order/ItemDisplay/ItemDisplay';
import OrderCart from '../../../components/Employee/Order/OrderCart/OrderCart';
import './Order.css';

let orderCounter = 1000; // Static counter to track order IDs

const EmployeeOrder = () => {
  const [category, setCategory] = useState("All");
  const [orderId, setOrderId] = useState(orderCounter); // Start order ID at 1021

  const createNewOrder = () => {
    orderCounter += 1; // Increment order counter
    setOrderId(orderCounter); // Set new order ID
  };

  // Update orderId when category changes
  useEffect(() => {
    createNewOrder(); // Call the function to create a new order whenever category changes
  }, [category]); // Depend on category to trigger effect

  return (
    <div>
      <Sidebar />
      <div className="em-main-content">
        <Header />
        <OrderCart category={category} setCategory={setCategory} orderId={orderId} />
        <ItemDisplay category={category} orderId={orderId} /> {/* Pass orderId to ItemDisplay */}
      </div>
    </div>
  );
}

export default EmployeeOrder;
