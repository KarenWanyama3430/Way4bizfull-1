import React from "react";

import AdminDashBoardHeader from "./AdminDashBoardHeader";
import AdminDashBoardSecondaryHeader from "./AdminDashboardSecondaryHeader";
import Complaints from "./Complaints";
import "./AdminDashBoardComplaints.css";

class AdminDashBoardComplaints extends React.Component {
  render() {
    return (
      <div className="container-fluid p-0 mb-5">
        <AdminDashBoardHeader />
        <AdminDashBoardSecondaryHeader />
        <div className="container box-container mt-4">
          <h3 className="my-2" style={{ textAlign: "center" }}>
            Complaints
          </h3>
          <Complaints />
        </div>
      </div>
    );
  }
}

export default AdminDashBoardComplaints;
