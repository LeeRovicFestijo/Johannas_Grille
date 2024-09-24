import React, { useState } from "react";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import TransactionPopup from "../../../components/Admin/Transaction/TransactionEdit";
import { RiEditLine } from "react-icons/ri"; // Make sure to import your icons
import { MdDeleteOutline } from "react-icons/md";
import "./Transaction.css";

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
  {
    id: 102,
    name: "Afaq Karim",
    phone: 1234567890,
    email: "john@gmail.com",
    branch: "BATANGAS",
    date: "Sept 20,2024",
    time: "12:00 pm",
    status: "pending",
    amount: 500,
  },
  {
    id: 103,
    name: "Afaq Karim",
    phone: 1234567890,
    email: "john@gmail.com",
    branch: "BAUAN",
    date: "Sept 20,2024",
    time: "2:00 pm",
    status: "pending",
    amount: 100,
  },
  {
    id: 104,
    name: "Afaq Karim",
    phone: 1234567890,
    email: "john@gmail.com",
    branch: "BATANGAS",
    date: "Sept 20,2024",
    time: "4:00 pm",
    status: "pending",
    amount: 60,
  },
  {
    id: 105,
    name: "Afaq Karim",
    phone: 1234567890,
    email: "john@gmail.com",
    branch: "BAUAN",
    date: "Sept 20,2024",
    time: "6:00 pm",
    status: "pending",
    amount: 80,
  },
];
const Transaction = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setIsEditModalOpen(false);
  };

  return (
    <main className="page-wrapper">
      <Sidebar />
      <div className="content-wrapper">
        <div>
          <h1>Reservation Page</h1>
          <section className="tra-content-area-table">
            <div className="tra-data-table-info">
              <h1 className="tra-data-table-title">Lists</h1>
            </div>
            <div className="tra-data-table-diagram">
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
                        <div className="tra-dt-status">
                          <span className={`tra-dt-status-dot dot-${dataItem.status}`}></span>
                          <span className="tra-dt-status-text">{dataItem.status}</span>
                        </div>
                      </td>
                      <td>${dataItem.amount.toFixed(2)}</td>
                      <td className="tra-dt-cell-action">
                        <i onClick={() => handleEditClick(dataItem)}>
                          <RiEditLine size={25} />
                        </i>
                        <i>
                          <MdDeleteOutline size={25} />
                        </i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {isEditModalOpen && (
          <TransactionPopup
            dataItem={selectedOrder} // Change here
            onClose={handleCloseModal} // Change here
          />
        )}
      </div>
    </main>
  );
};

export default Transaction;
