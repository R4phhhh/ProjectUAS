import React from "react";
import DashboardHeader from "./DashBoard"; // Menggunakan DashboardHeader
import "./AdminHomePage.css";

const AdminHomePage = () => {
  return (
    <div className="admin-homepage">
      <DashboardHeader />
    </div>
  );
};

export default AdminHomePage;