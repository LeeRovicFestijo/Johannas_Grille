import React, { useEffect, useState } from 'react';
import { RxAvatar } from "react-icons/rx";
import Navbar from '../../../pages/Customer/Navbar/Navbar';
import './CustomerInfo.css';
import axios from 'axios';

const ProfileCustomer = () => {
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token); // Log token for debugging
    
        if (token) {
          const response = await axios.get('http://localhost:3000/api/customer', {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log('Response data:', response.data); // Log response for debugging
          setCustomer(response.data);
        } else {
          console.error('No token found');
        }
      } catch (error) {
        console.error('Error fetching customer data:', error);
        if (error.response) {
          console.error('Server responded with:', error.response.data);
          console.error('Status code:', error.response.status);
        }
      }
    };

    fetchCustomerInfo();
  }, []);

  return (
    <main>
      <Navbar />
      <div className="customer-info-header">
        <h1>Profile</h1>
      </div>

      <div className="customer-info-content">
        <div className="customer-info">
          <div className="customer-avatar-box">
            <RxAvatar className="customer-avatar" size={100} />
          </div>
          <h2 className="customer-avatar-name">
            {customer.firstname} {customer.lastname}
          </h2>
          <div className="customer-personal-info">
            <p>{customer.usertype}</p>
          </div>
        </div>

        <div className="customer-info-form">
          <h3>Account Settings</h3>
          <div className="customer-form-row">
            <div className="customer-form-group">
              <label htmlFor="first-name">First Name</label>
              <input type="text" id="first-name" value={customer.firstname || ''} readOnly />
            </div>
            <div className="customer-form-group">
              <label htmlFor="last-name">Last Name</label>
              <input type="text" id="last-name" value={customer.lastname || ''} readOnly />
            </div>
          </div>

          <div className="customer-form-row">
            <div className="customer-form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" value={customer.username || ''} readOnly />
            </div>
            <div className="customer-form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" value={customer.email || ''} readOnly />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileCustomer;
