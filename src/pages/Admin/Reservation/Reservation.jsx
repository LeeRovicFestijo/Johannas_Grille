import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import AdminReservationMenuCategory from "../../../components/Admin/Reservation/AdminReservationMenuCategory/AdminReservationMenuCategory";
import AdminReservationMenuList from "../../../components/Admin/Reservation/AdminReservationMenuList/AdminReservationMenuList";
import "./Reservation.css";

const ReservationMenu = () => {

  return (
    <main className="page-wrapper">
      <Sidebar />
      <div className="content-wrapper">
        <AdminReservationMenuCategory />
        <AdminReservationMenuList />
      </div>
    </main>
  );
};

export default ReservationMenu;