import React from "react";

import AdminDashBoardHeader from "./AdminAdminDashBoardHeader";
import AdminDashBoardSecondaryHeader from "./AdminDashboardSecondaryHeader";

class AdminDashBoardNoSellers extends React.Component {
  render() {
    return (
      <div className="container-fluid p-0 mb-5">
        <AdminDashBoardHeader />
        <AdminDashBoardSecondaryHeader />
        <div className="container box-container mt-4">
          <p style={{ textAlign: "center", padding: "10px 0px" }}>
            No sellers!
          </p>
        </div>
      </div>
    );
  }
}

export default AdminDashBoardNoSellers;
