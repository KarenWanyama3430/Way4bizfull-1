import React from "react";
import { IconContext } from "react-icons";
import { FaRegUserCircle } from "react-icons/fa";
import AdminDashBoardHeader from "./AdminDashBoardHeader";
import "./BuyerInfo.css";
import { AiOutlineMail } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import { DiCssTricks } from "react-icons/di";

class BuyerInfo extends React.Component {
  render() {
    return (
      <div className="container-fluid p-0 mb-5">
        <AdminDashBoardHeader />
        <div className="container mt-4">
          <div>
            <div className="row admin-buyer-wrapper">
              <div className="col-md-5">
                <div style={{ width: "100%", textAlign: "center" }}>
                  <IconContext.Provider
                    value={{ className: "admin-user-icon" }}
                  >
                    <FaRegUserCircle />
                  </IconContext.Provider>
                </div>
              </div>
              <div className="col-md-7">
                <div>
                  <p>
                    <DiCssTricks />
                    <span className="ml-1">
                      <strong>John Doe</strong>
                    </span>
                  </p>
                  <h6>
                    <AiOutlineMail />
                    <span className="ml-1">johndoe@gmail.com</span>
                  </h6>

                  <p>
                    <MdDateRange />
                    <spa className="ml-1">Joined 1/1/1</spa>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BuyerInfo;
