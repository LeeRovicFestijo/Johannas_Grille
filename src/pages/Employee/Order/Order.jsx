import React from 'react'
import Sidebar from '../../../components/Employee/Sidebar/Sidebar';
import Header from '../../../components/Employee/Header/Header';
import './Order.css';
import Order from '../../../components/Employee/Order/Order';

const OrderCart = () => {
  return (
    <div>
      <Sidebar />
      <div className="em-main-content">
        <Header />
        <Order />
      </div>
    </div>
  )
}

export default OrderCart
