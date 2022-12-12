import React from "react";
import "./AuthHeader.css";
import { Link } from "react-router-dom";

class AuthHeader extends React.Component {
  render() {
    return (
      <div id="auth-header" className="primary-background">
        <Link to="/" className="link secondary-link">
          {/* <h1>LOGO</h1> */}
          <img className="logo-img" src="/logo.jpg" alt="logo" />
        </Link>
      </div>
    );
  }
}

export default AuthHeader;
