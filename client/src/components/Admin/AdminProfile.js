import React from "react";

import "./AdminProfile.css";
import { FaUserCircle } from "react-icons/fa";

class AdminProfile extends React.Component {
  render() {
    return (
      <div id={this.props.id} className="profile-img">
        <FaUserCircle style={{ fontSize: "40px", color: "#f76b1a" }} />
      </div>
    );
  }
}

export default AdminProfile;
