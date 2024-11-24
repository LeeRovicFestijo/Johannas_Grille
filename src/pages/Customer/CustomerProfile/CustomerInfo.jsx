import React, { useEffect, useState } from 'react';
import { RxAvatar } from "react-icons/rx";
import Navbar from '../../../pages/Customer/Navbar/Navbar';
import './CustomerInfo.css';
import axios from 'axios';

const ProfileCustomer = () => {
  const [customer, setCustomer] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token); // Log token for debugging

        if (token) {
          const response = await axios.get('https://localhost/api/customer', {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log('Response data:', response.data); // Log response for debugging
          setCustomer(response.data);
        } else {
          setError('No token found. Please log in.');
        }
      } catch (error) {
        console.error('Error fetching customer data:', error);
        setError(error.response?.data?.message || 'Failed to fetch customer data.');
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
        {error ? (
          <div className="error-message">
            <p>{error}</p>
          </div>
        ) : (
          <>
            <div className="customer-info">
              <div className="customer-avatar-box">
                {customer.image ? (
                  <img src={customer.image} alt="Profile" className="customer-avatar-img" />
                ) : (
                  <RxAvatar className="customer-avatar" size={100} />
                )}
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
          </>
        )}
      </div>
    </main>
  );
};

export default ProfileCustomer;
