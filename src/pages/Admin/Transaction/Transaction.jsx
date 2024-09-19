// import OrderAction from "./OrderAction";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
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

const Orders = () => {
  return (
    <main className="page-wrapper">
      {/* left of page */}
      <Sidebar />
      {/* right side/content of the page */}
      <div className="content-wrapper">
      <div>
      <h1>Reservation Page</h1>
      {<section className="or-content-area-table">
      <div className="or-data-table-info">
        <h1 className="or-data-table-title">Lists</h1>
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
                  <td>{dataItem.phone}</td>
                  <td>{dataItem.email}</td>
                  <td>{dataItem.branch}</td>
                  <td>{dataItem.date}</td>
                  <td>{dataItem.time}</td>
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
                    {/* <OrderAction /> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>}
    </div>
      </div>
    </main>
  );
};

export default Orders;

