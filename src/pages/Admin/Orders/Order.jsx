import React, { useState } from "react";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import "./Order.css";
import { MdDeleteOutline } from "react-icons/md";
import { RiEditLine } from "react-icons/ri";
import OrderEdit from "../../../components/Admin/Order/OrderEdit";

const TABLE_HEADS = [
  "Products",
  "Order ID",
  "Date",
  "Customer name",
  "Status",
  "Amount",
  "Action",
];

const TABLE_DATA = [
  {
    id: 100,
    name: "Iphone 13 Pro",
    order_id: 11232,
    date: "Jun 29,2022",
    customer: "Afaq Karim",
    status: "delivered",
    amount: 400,
  },
  {
    id: 101,
    name: "Macbook Pro",
    order_id: 11232,
    date: "Jun 29,2022",
    customer: "Afaq Karim",
    status: "pending",
    amount: 288,
  },
  {
    id: 102,
    name: "Apple Watch",
    order_id: 11232,
    date: "Jun 29,2022",
    customer: "Afaq Karim",
    status: "canceled",
    amount: 500,
  },
  {
    id: 103,
    name: "Microsoft Book",
    order_id: 11232,
    date: "Jun 29,2022",
    customer: "Afaq Karim",
    status: "delivered",
    amount: 100,
  },
  {
    id: 104,
    name: "Apple Pen",
    order_id: 11232,
    date: "Jun 29,2022",
    customer: "Afaq Karim",
    status: "delivered",
    amount: 60,
  },
  {
    id: 105,
    name: "Airpods",
    order_id: 11232,
    date: "Jun 29,2022",
    customer: "Afaq Karim",
    status: "delivered",
    amount: 80,
  },
];

const Orders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Open modal and set the selected order
  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Handle closing modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Logic to update the order details
    handleCloseModal();
  };

  return (
    <main className="page-wrapper">
      {/* left of page */}
      <Sidebar />
      {/* right side/content of the page */}
      <div className="content-wrapper">
        <div>
          <h1>Orders Page</h1>
          <section className="or-content-area-table">
            <div className="or-data-table-info">
              <h1 className="or-data-table-title">Latest Orders</h1>
            </div>
            <div className="or-data-table-diagram">
              <table>
                <thead>
                  <tr>
                    {TABLE_HEADS?.map((th, index) => (
                      <th key={index}>{th}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABLE_DATA?.map((dataItem) => {
                    return (
                      <tr key={dataItem.id}>
                        <td>{dataItem.name}</td>
                        <td>{dataItem.order_id}</td>
                        <td>{dataItem.date}</td>
                        <td>{dataItem.customer}</td>
                        <td>
                          <div className="or-dt-status">
                            <span
                              className={`or-dt-status-dot dot-${dataItem.status}`}
                            ></span>
                            <span className="or-dt-status-text">{dataItem.status}</span>
                          </div>
                        </td>
                        <td>${dataItem.amount.toFixed(2)}</td>
                        <td className="or-dt-cell-action">
                          <div className="edit-delete-container">
                            <div className="edit-btn">
                              {/* Edit Icon Button */}
                              <button
                                className="item-btn-cart"
                                onClick={() => handleEditClick(dataItem)}
                              >
                                <RiEditLine size={25} />
                              </button>
                              {/* Delete Icon Button */}
                              <button className="item-btn-cart">
                                <MdDeleteOutline size={25} />
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Render EditOrderForm as a modal */}
        {isModalOpen && (
          <OrderEdit
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
            handleFormSubmit={handleFormSubmit}
            handleCloseModal={handleCloseModal}
          />
        )}


      </div>
    </main>
  );
};


export default Orders;