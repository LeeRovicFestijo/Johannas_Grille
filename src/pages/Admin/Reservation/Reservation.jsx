import React from "react";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import OrderAction from "../../../components/Admin/Reservation/ReservationEdit"; // Import the OrderAction component
import "./Reservation.css";

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
  // More data...
];

const Orders = () => {
  const handleEdit = (item) => {
    console.log("Editing item: ", item);
    // Add logic to handle editing
  };

  const handleDelete = (item) => {
    console.log("Deleting item: ", item);
    // Add logic to handle deletion
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
      </div>
    </main>
  );
};

export default Orders;