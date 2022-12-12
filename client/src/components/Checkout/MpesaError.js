import React from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import MiniMenuWrapper from "../MiniMenuWrapper/MiniMenuWrapper";
import { Link, withRouter, Redirect } from "react-router-dom";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import "./MpesaError.css";
import { connect } from "react-redux";
import { removePendingAndSuccess } from "../../redux/actions";
import MobileLogo from "../Header/MobileLogo";

class MpesaError extends React.Component {
  componentWillUnmount() {
    this.props.removePendingAndSuccess();
  }
  render() {
    if (
      !this.props.orderSuccess ||
      (this.props.orderSuccess && this.props.orderSuccess.mpesaCode === 0)
    )
      return <Redirect to="/" />;
    return (
      <div className="main">
        <div className="content">
          <MobileLogo />
          <Header />
          <div className="container">
            <div className="row">
              <div className="col-md-9 col-lg-8 mx-auto">
                <div className="box-container py-3 pl-2 pr-1">
                  <div className="d-flex mb-3 align-items-center justify-content-center mb-3">
                    <AiOutlineExclamationCircle
                      style={{ fontSize: "100px", color: "#f76b1a" }}
                    />
                  </div>
                  <h3 style={{ textAlign: "center" }}>
                    Ooops! Something is wrong.
                  </h3>

                  <ul className="mpesa-error-guides my-3">
                    <li>
                      <p>Ensure you are using a safaricom registered number.</p>
                    </li>
                    <li>
                      <p>Ensure your pin is correct.</p>
                    </li>
                    <li>
                      <p>
                        Ensure you have sufficient funds to make the
                        transaction.
                      </p>
                    </li>
                    <li>
                      <h6>
                        You can also try other payment methods or contact us{" "}
                        <Link to="/">here</Link> for help.
                      </h6>
                    </li>
                  </ul>

                  <div className="d-flex align-items-center justify-content-center">
                    <button
                      className="btn btn-md mpesa-error-to-shop"
                      onClick={() => this.props.history.push("/checkout")}
                    >
                      Go To Checkout
                    </button>
                  </div>
                </div>
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
const mapStateToProps = (state) => {
  return {
    orderSuccess: state.cartReducer.orderSuccess,
  };
};
export default withRouter(
  connect(mapStateToProps, { removePendingAndSuccess })(MpesaError)
);
