import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import "./Customer.css";
import { MdDeleteOutline } from "react-icons/md";
import { RiEditLine } from "react-icons/ri";
import EditCustomer from '../../../components/Admin/Customer/EditCustomer';


const CustomerList = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [customer, setCustomer] = useState([]);

  const fetchCustomer = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/customer');
      if (response.ok) {
        const data = await response.json();
        setCustomer(data);
      } else {
        console.error('Error fetching menu items:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleUpdate = () => {
    fetchEmployees(); // Refresh the menu items list
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
    setSelectedEmployee();  // Pass the employee's ID here
  };

  return (
    <main className="page-wrapper">
      <Sidebar />
      <div className="content-wrapper">
        <div>
          <h1>Customer Account</h1>
          <section className="or-content-area-table">
            <div className="or-data-table-diagram">
              <table>
                <thead>
                  <tr>
                    <th>CustomerID</th>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Address</th>
                    <th>PhoneNumber</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {customer?.map((dataItem) => (
                    <tr key={dataItem.id}>
                      <td>{dataItem.customerid}</td>
                      <td>{dataItem.firstname}</td>
                      <td>{dataItem.lastname}</td>
                      <td>{dataItem.address}</td>
                      <td>{dataItem.phonenumber}</td>
                      <td>{dataItem.email}</td>
                      <td className="or-dt-cell-action">
                        <div className="edit-delete-container">
                          <div className="edit-btn">
                            <button className="item-btn-cart" onClick={() => handleEditClick()} >
                              <RiEditLine size={25} />
                            </button>
                            <button className="item-btn-cart">
                              <MdDeleteOutline size={25} />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
        {isEditModalOpen && (
          <EditCustomer
            onClose={handleCloseModal}
            onSave={handleUpdate}
          />
        )}
      </div>
    </main>
  );
};

export default CustomerList;