import React, { useState } from "react";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import "./Users.css";


// Modal component for the password prompt
const Modal = ({ showModal, setShowModal, handleSubmit, error }) => {
  const [password, setPassword] = useState("");

  const handlePasswordSubmit = () => {
    handleSubmit(password);
    setPassword("");
  };

  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Enter Password</h2>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handlePasswordSubmit}>Submit</button>
        <button onClick={() => setShowModal(false)}>Cancel</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

// Modal for creating new transactions
const TransactionModal = ({ show, setShow, addTransaction }) => {
  const [newTransaction, setNewTransaction] = useState({
    name: "",
    phone: "",
    email: "",
    branch: "",
    date: "",
    time: "",
    status: "pending",
    amount: 0,
    userType: "Employee",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleSubmit = () => {
    addTransaction(newTransaction);
    setNewTransaction({
      name: "",
      phone: "",
      email: "",
      branch: "",
      date: "",
      time: "",
      status: "pending",
      amount: 0,
      userType: "Employee",
    });
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Transaction</h2>
        <input name="name" placeholder="Name" value={newTransaction.name} onChange={handleChange} />
        <input name="phone" placeholder="Phone" value={newTransaction.phone} onChange={handleChange} />
        <input name="email" placeholder="Email" value={newTransaction.email} onChange={handleChange} />
        <input name="branch" placeholder="Branch" value={newTransaction.branch} onChange={handleChange} />
        <input name="date" placeholder="Date" value={newTransaction.date} onChange={handleChange} />
        <input name="time" placeholder="Time" value={newTransaction.time} onChange={handleChange} />
        <input type="number" name="amount" placeholder="Amount" value={newTransaction.amount} onChange={handleChange} />
        <button onClick={handleSubmit}>Add Transaction</button>
        <button onClick={() => setShow(false)}>Cancel</button>
      </div>
    </div>
  );
};

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

const TABLE_DATA = [
  // Customer transactions
  {
    id: 100,
    name: "John Doe",
    phone: 1234567890,
    email: "john@example.com",
    branch: "BATANGAS",
    date: "Sept 20, 2024",
    time: "7:00 am",
    status: "completed",
    amount: 400,
    userType: "Customer",
  },
  {
    id: 101,
    name: "Jane Smith",
    phone: 1234567891,
    email: "jane@example.com",
    branch: "BATANGAS",
    date: "Sept 20, 2024",
    time: "8:00 am",
    status: "completed",
    amount: 250,
    userType: "Customer",
  },
  {
    id: 102,
    name: "Emily Johnson",
    phone: 1234567892,
    email: "emily@example.com",
    branch: "BATANGAS",
    date: "Sept 21, 2024",
    time: "9:00 am",
    status: "completed",
    amount: 300,
    userType: "Customer",
  },
  {
    id: 103,
    name: "Michael Brown",
    phone: 1234567893,
    email: "michael@example.com",
    branch: "BATANGAS",
    date: "Sept 21, 2024",
    time: "10:00 am",
    status: "pending",
    amount: 450,
    userType: "Customer",
  },
  // Employee transactions
  {
    id: 200,
    name: "Afaq Karim",
    phone: 1234567894,
    email: "afaq@example.com",
    branch: "BATANGAS",
    date: "Sept 20, 2024",
    time: "12:00 pm",
    status: "pending",
    amount: 500,
    userType: "Employee",
  },
  {
    id: 201,
    name: "Alex Johnson",
    phone: 1234567895,
    email: "alex@example.com",
    branch: "BATANGAS",
    date: "Sept 20, 2024",
    time: "1:00 pm",
    status: "completed",
    amount: 750,
    userType: "Employee",
  },
  {
    id: 202,
    name: "Sara Davis",
    phone: 1234567896,
    email: "sara@example.com",
    branch: "BATANGAS",
    date: "Sept 22, 2024",
    time: "2:00 pm",
    status: "completed",
    amount: 600,
    userType: "Employee",
  },
  {
    id: 203,
    name: "David Wilson",
    phone: 1234567897,
    email: "david@example.com",
    branch: "BATANGAS",
    date: "Sept 22, 2024",
    time: "3:00 pm",
    status: "pending",
    amount: 700,
    userType: "Employee",
  },
];


const Orders = () => {
  const [filterType, setFilterType] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [error, setError] = useState("");
  const [tableData, setTableData] = useState(TABLE_DATA);

  const correctPassword = "admin123";

  const handleFilterClick = (type) => {
    if (type === "Employee") {
      setShowModal(true);
    } else {
      setFilterType(type);
    }
  };

  const handlePasswordSubmit = (password) => {
    if (password === correctPassword) {
      setError("");
      setFilterType("Employee");
      setShowModal(false);
    } else {
      setError("Invalid password!");
    }
  };

  const addTransaction = (transaction) => {
    setTableData((prevData) => [
      ...prevData,
      { ...transaction, id: prevData.length + 1 }, // Create a new ID
    ]);
  };

  const filteredData =
    filterType === "All"
      ? tableData
      : tableData.filter((dataItem) => dataItem.userType === filterType);


  return (
    <main className="page-wrapper">
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        handleSubmit={handlePasswordSubmit}
        error={error}
      />
      <TransactionModal
        show={showTransactionModal}
        setShow={setShowTransactionModal}
        addTransaction={addTransaction}
      />
      <Sidebar />
      <div className="content-wrapper">
        <div>
          <h1>Reservation Page</h1>
          <section className="or-content-area-table">
            <div className="or-data-table-info">
              <h1 className="or-data-table-title">Transaction Lists</h1>
              <div className="filter-section">
                <span
                  className={`filter-text clickable ${
                    filterType === "Customer" ? "active-filter" : ""
                  }`}
                  onClick={() => handleFilterClick("Customer")}
                >
                  Customer
                </span>
                <span> | </span>
                <span
                  className={`filter-text clickable ${
                    filterType === "Employee" ? "active-filter" : ""
                  }`}
                  onClick={() => handleFilterClick("Employee")}
                >
                  Employee
                </span>
              </div>
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
                  {filteredData.length > 0 ? (
                    filteredData.map((dataItem) => (
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
                            <span className="or-dt-status-text">
                              {dataItem.status}
                            </span>
                          </div>
                        </td>
                        <td>${dataItem.amount.toFixed(2)}</td>
                        <td className="or-dt-cell-action">
                          {/* Action buttons can be added here */}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={TABLE_HEADS.length}>No transactions found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Orders;