import React, { useState } from "react";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import "./Inventory.css";
import { MdDeleteOutline } from "react-icons/md";
import { RiEditLine } from "react-icons/ri";

const TABLE_HEADS = [
  "MenuItemID",
  "Name",
  "Quantity",
  "ConsumedOfBranch",
  "EndingInventory",
  "Remarks",
  "Date",
  "Action",
];

const TABLE_DATA = [
  // Customer transactions
  {
    id: 100,
    menuitid: 100,
    name: "Doe",
    quantity: 20,
    endinv: 3,
    cob: 10,
    remarks: 10,
    date: "10/03/2024",
  },
];


const Inventory = () => {

  return (
    <main className="page-wrapper">
      <Sidebar />
      <div className="content-wrapper">
        <div>
          <h1>Inventory</h1>
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
                    
                      <td>{dataItem.menuitid}</td>
                      <td>{dataItem.name}</td>
                      <td>{dataItem.quantity}</td>
                      <td>{dataItem.cob}</td>
                      <td>{dataItem.endinv}</td>
                      <td>{dataItem.remarks}</td>
                      <td>{dataItem.date}</td>
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

export default Inventory;