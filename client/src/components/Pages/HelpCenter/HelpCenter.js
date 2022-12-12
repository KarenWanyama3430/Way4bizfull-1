import React from "react";

import "./HelpCenter.css";

import Footer from "../../Footer/Footer";
import MiniMenuWrapper from "../../MiniMenuWrapper/MiniMenuWrapper";
// import { AiOutlineSearch } from "react-icons/ai";
// import { BsQuestionCircle, BsArrowRight } from "react-icons/bs";
// import { RiBookletLine } from "react-icons/ri";
// import { FiMail } from "react-icons/fi";
// import { Link } from "react-router-dom";
import HelpCenterHeader from "./HelpCenterHeader";
import FAQAccordion from "./FAQAccordion";

class HelpCenter extends React.Component {
  state = {
    open: 1
  };

  handleClick = (e, val) => {
    this.setState({
      open: val
    });
  };
  render() {
    return (
      <div className="main">
        <div className="content white-body">
          <HelpCenterHeader />
          <div
            className="container-fluid p-0 m-0"
            style={{ backgroundColor: "#fff" }}
          >
            <div className="help-center-hero">
              <h1
                id="help-center-hero-head"
                style={{ textTransform: "uppercase", color: "#fff" }}
              >
                How can we help?
              </h1>
              {/* <div className="input-group mt-3" id="help-center-input">
                <input
                  className="form-control"
                  placeholder="eg. How to sell on way4Biz?"
                />
                <div className="input-group-append">
                  <div
                    style={{
                      backgroundColor: "#f76b1a",
                      width: "60px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <AiOutlineSearch
                      style={{ fontSize: "20px", color: "#fff" }}
                    />
                  </div>
                </div>
              </div> */}
            </div>

            <div className="container my-4">
              <h1>FAQs</h1>
              <h6>Quickly find out if we addressed your query.</h6>
              <div className="my-3">
                <FAQAccordion />
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <MiniMenuWrapper />
      </div>
    );
  }
}

export default HelpCenter;
