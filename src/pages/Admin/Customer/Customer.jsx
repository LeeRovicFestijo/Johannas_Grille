import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import "./Customer.css";
import { MdDeleteOutline } from "react-icons/md";
import { RiEditLine } from "react-icons/ri";
import EditModal from '../../../components/Admin/Customer/EditCustomer'; // Correct import


const CustomerList = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomer] = useState([]);

  const fetchCustomer = () => {
    fetch("http://localhost:3000/api/customer")
      .then((response) => response.json())
      .then((data) => setCustomer(data))
      .catch((error) => console.error("Error fetching customer data:", error));
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleUpdate = () => {
    fetchCustomer(); // Refresh the customers list
  };

  const handleEditClick = (customer) => {
    console.log('Selected customer ID:', customer.customerid);
    setIsEditModalOpen(true);
    setSelectedCustomer(customer.customerid);
  };

  const handleDelete = (customerID) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    fetch(`http://localhost:3000/api/customer/${customerID}`, {
      method: "DELETE",
    })
      .then((response) => response.ok && setCustomer((prev) => prev.filter((e) => e.customerid !== customerID)))
      .catch((error) => console.error("Error deleting Customer:", error));
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
                  {customers?.map((customer) => (
                    <tr key={customer.customerid}>
                      <td>{customer.customerid}</td>
                      <td>{customer.firstname}</td>
                      <td>{customer.lastname}</td>
                      <td>{customer.address}</td>
                      <td>{customer.phonenumber}</td>
                      <td>{customer.email}</td>
                      <td className="or-dt-cell-action">
                        <div className="edit-delete-container">
                          <div className="edit-btn">
                            <button className="item-btn-cart" onClick={() => handleEditClick(customer)}>
                              <RiEditLine size={25} />
                            </button>
                            <button onClick={() => handleDelete(customer.customerid)} className="item-btn-cart">
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
        {isEditModalOpen && selectedCustomer && (
          <EditModal
            customerID={selectedCustomer}
            onClose={handleCloseModal}
            onSave={handleUpdate}
          />
        )}
      </div>
    </main>
  );
};

export default CustomerList;
