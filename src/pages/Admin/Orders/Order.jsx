import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import "./Order.css";
import { MdDeleteOutline } from "react-icons/md";
import { RiEditLine } from "react-icons/ri";
import OrderEdit from "../../../components/Admin/Order/OrderEdit";
import OrderDelete from "../../../components/Admin/Order/OrderDel";

const TABLE_HEADS = [
  "OrderID",
  "CustomerID",
  "OrderType",
  "Date",
  "Status",
  "Total Amount",
  "Time",
  "Action",
];

const Orders = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    fetch("http://localhost:3000/api/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching order data:", error));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <main className="page-wrapper">
      <Sidebar />
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
                  {orders?.map((dataItem) => {
                    // Format the date and time
                    const formattedDate = new Date(dataItem.date).toLocaleDateString("en-US", {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    });

                    const formattedTime = new Date(`1970-01-01T${dataItem.time}`).toLocaleTimeString("en-US", {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    });

                    return (
                      <tr key={dataItem.orderid}>
                        <td>{dataItem.orderid}</td>
                        <td>{dataItem.customerid}</td>
                        <td>{dataItem.ordertype}</td>
                        <td>{formattedDate}</td>
                        <td>
                          <div className="or-dt-status">
                            <span className={`or-dt-status-dot dot-${dataItem.status}`}></span>
                            <span className="or-dt-status-text">{dataItem.status}</span>
                          </div>
                        </td>
                        <td>P{dataItem.totalamount}</td>
                        <td>{formattedTime}</td>
                        <td className="or-dt-cell-action">
                          <div className="edit-delete-container">
                            <div className="edit-btn">
                              <button className="item-btn-cart">
                                <RiEditLine size={25} />
                              </button>
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
        {isEditModalOpen && (
          <OrderEdit
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
            handleFormSubmit={() => console.log("Order updated")}
            handleCloseModal={() => setIsEditModalOpen(false)}
          />
        )}

        {/* Render OrderDelete modal */}
        {isDeleteModalOpen && (
          <OrderDelete
            selectedOrder={selectedOrder}
            handleCloseModal={() => setIsDeleteModalOpen(false)}
            handleDeleteOrder={(orderId) => console.log("Order deleted:", orderId)}
          />
        )}
      </div>
    </main>
  );
};

export default Orders;
