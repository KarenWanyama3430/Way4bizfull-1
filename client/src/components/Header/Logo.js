import React from "react";
import "./Logo.css";
import { Link } from "react-router-dom";

class Logo extends React.Component {
  render() {
    return (
      <div id={this.props.id}>
        <Link to="/" className="link secondary-link">
          {/* <h1>LOGO</h1> */}
          <img className="logo-img" src="/logo.jpg" alt="logo" />
        </Link>
      </div>
    );
  }
}

export default Logo;
