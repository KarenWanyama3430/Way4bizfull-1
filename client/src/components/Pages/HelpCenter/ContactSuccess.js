import React from "react";
import { BsCheckCircle } from "react-icons/bs";

import "./ContactSuccess.css";
import Footer from "../../Footer/Footer";
import MiniMenuWrapper from "../../MiniMenuWrapper/MiniMenuWrapper";
import HelpCenterHeader from "./HelpCenterHeader";
import { Link } from "react-router-dom";

class ContactSuccess extends React.Component {
  render() {
    return (
      <div className="main">
        <div className="content white-body" style={{ textAlign: "center" }}>
          <HelpCenterHeader />
          <div
            className="container-fluid p-0 m-0 py-4"
            style={{ backgroundColor: "#fff" }}
          ></div>
          <div className="d-flex align-items-center justify-content-center">
            <BsCheckCircle style={{ fontSize: "100px", color: "#4BB543" }} />
          </div>
          <div className="mt-3">
            <p>
              Thank you for contacting Way4Biz. We will get back to you shortly.
            </p>
          </div>
          <p>
            <Link to="/" style={{ color: "#f76b1a" }}>
              Home
            </Link>
          </p>
        </div>
        <Footer />
        <MiniMenuWrapper />
      </div>
    );
  }
}

export default ContactSuccess;
