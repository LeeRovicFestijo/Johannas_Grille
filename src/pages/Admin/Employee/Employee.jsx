import React, { useState } from "react";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import TransactionPopup from "../../../components/Admin/Reservation/ReservationPopup";
import { RiEditLine } from "react-icons/ri"; // Make sure to import your icons
import { MdDeleteOutline } from "react-icons/md";
import "./Employee.css";

const TABLE_HEADS = [
  "UserID",
  "UserType",
  "FirstName",
  "LastName",
  "Email",
  "PhoneNumber",
  "BranchID",
  "Action",
];

const TABLE_DATA = [
  {
    id: 100,
    user: "Employee",
    fname: "Afaq",
    lname: "Lisbo",
    email: "john@gmail.com",
    phone: 1234567890,
    branch: "BATANGAS",
  },
];
const EmployeeList = () => {
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
          <h1>Employee Account</h1>
          <section className="emplo-content-area-table">
            <div className="emplo-data-table-diagram">
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
                      <td>{dataItem.id}</td>
                      <td>{dataItem.user}</td>
                      <td>{dataItem.fname}</td>
                      <td>{dataItem.lname}</td>
                      <td>{dataItem.email}</td>
                      <td>{dataItem.phone}</td>
                      <td>{dataItem.branch}</td>
                      <td className="emplo-dt-cell-action">
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

export default EmployeeList;
