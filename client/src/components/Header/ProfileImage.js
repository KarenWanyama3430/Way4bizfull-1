import React from "react";
import { FaUserCircle } from "react-icons/fa";

import "./ProfileImage.css";

class ProfileImage extends React.Component {
  render() {
    return (
      <div id={this.props.id}>
        <FaUserCircle style={{ fontSize: this.props.size, color: "#f76b1a" }} />
      </div>
    );
  }
}

export default ProfileImage;
