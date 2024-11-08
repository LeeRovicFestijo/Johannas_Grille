import React, {useState} from 'react'
import Sidebar from '../../../components/Employee/Sidebar/Sidebar';
import Header from '../../../components/Employee/Header/Header';
import ItemDisplay from '../../../components/Employee/Order/ItemDisplay/ItemDisplay';
import OrderCart from '../../../components/Employee/Order/OrderCart/OrderCart'
import './Order.css';

const EmployeeOrder = () => {
  
  const [category, setCategory] = useState("All");
  return (
    <div>
      <Sidebar />
      <div className="em-main-content">
        <Header />
        <OrderCart category={category} setCategory={setCategory} />
        <ItemDisplay category={category} />
      </div>
    </div>
  )
}

export default EmployeeOrder
