import React, { useState } from "react";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import "./Customer.css";
import { MdDeleteOutline } from "react-icons/md";
import { RiEditLine } from "react-icons/ri";

const TABLE_HEADS = [
  "CustomerID",
  "FirstName",
  "LastName",
  "Address",
  "PhoneNumber",
  "Email",
  "Action",
];

const TABLE_DATA = [
  // Customer transactions
  {
    id: 100,
    firstname: "John",
    lastname: "Doe",
    address: "Batangas City",
    phonenumber: 1234567890,
    email: "john@example.com",
  },
];


const CustomerList = () => {

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
                    {TABLE_HEADS?.map((th, index) => (
                      <th key={index}>{th}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABLE_DATA?.map((dataItem) => (
                    <tr key={dataItem.id}>
                      <td>{dataItem.id}</td>
                      <td>{dataItem.firstname}</td>
                      <td>{dataItem.lastname}</td>
                      <td>{dataItem.address}</td>
                      <td>{dataItem.phonenumber}</td>
                      <td>{dataItem.email}</td>
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
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default CustomerList;