import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import ReservationPopup from "../../../components/Admin/Reservation/ReservationPopup";
import { RiEditLine } from "react-icons/ri"; // Make sure to import your icons
import { MdDeleteOutline } from "react-icons/md";
import "./Reservation.css";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/reservations'); // Adjust this to your API URL
      const data = await response.json();
      setReservations(data); // Update state with fetched data
      window.location.reload()
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Triggering fetchData when the component mounts
  const fetchReservations = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/reservations');
      if (response.ok) {
        const data = await response.json();
        setReservations(data);
      } else {
        console.error('Error fetching menu items:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

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
            <div className="tra-data-table-diagram">
              <table>
                <thead>
                  <tr>
                    <th>CustomerID</th>
                    <th>Guests</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((dataItem) => {
                    const formattedDate = new Date(dataItem.reservationdate).toLocaleDateString("en-US", {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    });

                    const formattedTime = new Date(`1970-01-01T${dataItem.reservationtime}`).toLocaleTimeString("en-US", {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    });

                    return (
                      <tr key={dataItem.id}>
                        <td>{dataItem.customerid}</td>
                        <td>{dataItem.numberofguests}</td>
                        <td>{formattedDate}</td>
                        <td>{formattedTime}</td>
                        <td>
                          <div className="tra-dt-status">
                            <span className={`tra-dt-status-dot dot-${dataItem.status}`}></span>
                            <span className="tra-dt-status-text">{dataItem.status}</span>
                          </div>
                        </td>
                        <td>{dataItem.amount}</td>
                        <td className="tra-dt-cell-action">
                          <i onClick={() => handleEditClick(dataItem)}>
                            <RiEditLine size={25} />
                          </i>
                          <i>
                            <MdDeleteOutline size={25} onClick={() => handleEditClick(dataItem)} />
                          </i>
                        </td>
                      </tr>
                    );
                  })}

                </tbody>
              </table>
            </div>
          </section>
        </div>

        {isEditModalOpen && (
          <ReservationPopup
            dataItem={selectedOrder}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </main>
  );
};

export default ReservationList;