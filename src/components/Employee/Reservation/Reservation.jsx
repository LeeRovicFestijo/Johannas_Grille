import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import OrderAction from "./ReservationEdit"; // Import the OrderAction component
import "./Reservation.css";

// Define table headers
const TABLE_HEADS = [
  "Name",
  "Phone",
  "Email",
  "Branch",
  "Date",
  "Time",
  "Status",
  "Amount",
  "Action",
];

// Table data (can come from API)
const TABLE_DATA = [
  {
    id: 100,
    name: "Afaq Karim",
    phone: 1234567890,
    email: "john@gmail.com",
    date: "Sept 20,2024",
    branch: "BATANGAS",
    time: "7:00 am",
    status: "pending",
    amount: 400,
  },
  {
    id: 101,
    name: "Afaq Karim",
    phone: 1234567890,
    email: "john@gmail.com",
    branch: "BATANGAS",
    date: "Sept 20,2024",
    time: "10:00 am",
    status: "pending",
    amount: 288,
  },
  // More data...
];

const Orders = () => {
  // State to manage the visibility of the edit popup form
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  // State to manage the visibility of the delete confirmation popup
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  // State to hold the item being edited or deleted
  const [currentItem, setCurrentItem] = useState(null);

  // Function to handle "edit" action
  const handleEdit = (item) => {
    setCurrentItem(item); // Set the item being edited
    setIsEditPopupOpen(true); // Open the edit popup form
  };

  // Function to handle "delete" action
  const handleDelete = (item) => {
    setCurrentItem(item); // Set the item being deleted
    setIsDeletePopupOpen(true); // Open the delete confirmation popup
  };

  // Function to close the edit popup
  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
    setCurrentItem(null); // Clear the current item after closing
  };

  // Function to close the delete popup
  const closeDeletePopup = () => {
    setIsDeletePopupOpen(false);
    setCurrentItem(null); // Clear the current item after closing
  };

  // Function to handle delete confirmation
  const confirmDelete = () => {
    console.log("Item deleted:", currentItem);
    // Add your deletion logic here (e.g., API call to delete the item)
    closeDeletePopup(); // Close the delete popup after deletion
  };

  // Function to handle form submit for editing
  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log("Edited Item:", currentItem);
    // Here you can make an API call to save the edited changes
    closeEditPopup(); // Close the edit popup after saving
  };

  return (
    <main className="page-wrapper">
      <Sidebar />
      <div className="content-wrapper">
        <h1>Reservation Page</h1>
        <section className="or-content-area-table">
          <div className="or-data-table-info">
            <h1 className="or-data-table-title">Lists</h1>
          </div>
          <div className="or-data-table-diagram">
            <table>
              <thead>
                <tr>
                  {TABLE_HEADS.map((th, index) => (
                    <th key={index}>{th}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_DATA.map((dataItem) => (
                  <tr key={dataItem.id}>
                    <td>{dataItem.name}</td>
                    <td>{dataItem.phone}</td>
                    <td>{dataItem.email}</td>
                    <td>{dataItem.branch}</td>
                    <td>{dataItem.date}</td>
                    <td>{dataItem.time}</td>
                    <td>
                      <div className="or-dt-status">
                        <span className={`or-dt-status-dot dot-${dataItem.status}`}></span>
                        <span className="or-dt-status-text">{dataItem.status}</span>
                      </div>
                    </td>
                    <td>${dataItem.amount.toFixed(2)}</td>
                    <td className="or-dt-cell-action">
                      <OrderAction
                        onEdit={() => handleEdit(dataItem)}
                        onDelete={() => handleDelete(dataItem)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Edit Popup Form */}
        {isEditPopupOpen && (
          <div className="popup-overlay">
            <div className="popup-form">
              <h2>Edit Reservation</h2>
              <form onSubmit={handleEditSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={currentItem?.name || ""}
                    onChange={(e) =>
                      setCurrentItem({ ...currentItem, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    value={currentItem?.phone || ""}
                    onChange={(e) =>
                      setCurrentItem({ ...currentItem, phone: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={currentItem?.email || ""}
                    onChange={(e) =>
                      setCurrentItem({ ...currentItem, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="branch">Branch</label>
                  <input
                    type="text"
                    id="branch"
                    value={currentItem?.branch || ""}
                    onChange={(e) =>
                      setCurrentItem({ ...currentItem, branch: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    value={currentItem?.status || ""}
                    onChange={(e) =>
                      setCurrentItem({ ...currentItem, status: e.target.value })
                    }
                    required
                  >
                    <option value="pending">Pending</option>
                    <option value="delivered">Delivered</option>
                    <option value="canceled">Canceled</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="number"
                    id="amount"
                    value={currentItem?.amount || ""}
                    onChange={(e) =>
                      setCurrentItem({ ...currentItem, amount: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="save-btn">
                    Save
                  </button>
                  <button type="button" className="cancel-btn" onClick={closeEditPopup}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Popup */}
        {isDeletePopupOpen && (
          <div className="popup-overlay">
            <div className="popup-form">
              <h2>Delete Order</h2>
              <p>Are you sure you want to delete this order?</p>
              <p><strong>Order ID: {currentItem?.id}</strong></p>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={closeDeletePopup}>
                  Cancel
                </button>
                <button type="button" className="delete-confirm-btn" onClick={confirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Orders;