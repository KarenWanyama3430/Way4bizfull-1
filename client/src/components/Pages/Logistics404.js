import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MiniMenuWrapper from "../MiniMenuWrapper/MiniMenuWrapper";
import { connect } from "react-redux";
import "./Logistics404.css";
import MobileLogo from "../Header/MobileLogo";
import { Link, Redirect, withRouter } from "react-router-dom";

class Logistics404 extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    if (!this.props.requestServiceError) {
      return <Redirect to="/" />;
    }
    return (
      <div className="main">
        <div className="content">
          <MobileLogo />
          <Header />
          <div className="container-fluid white-body logistics-404">
            <div className="container text-center pt-5">
              <h4 className="mb-3">
                Ooops! It seems our delivery personnel is occupied.
              </h4>
              <p>
                Please{" "}
                <Link to="/logistics" style={{ color: "#f76b1a" }}>
                  try again
                </Link>{" "}
                after 30 minutes.
              </p>
            </div>
          </div>
        </div>
        <Footer />
        <MiniMenuWrapper />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    requestServiceError: state.user.requestServiceError
  };
};
export default withRouter(connect(mapStateToProps)(Logistics404));
