import React from "react";

import "./Authenticate.css";
import AuthHeader from "./AuthHeader";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { signInClick, registerClick } from "../../redux/actions";
import { connect } from "react-redux";
import MobileLogo from "../Header/MobileLogo";

class Authenticate extends React.Component {
  handleSignInClick = (e) => {
    this.props.signInClick();
  };

  handleRegisterClick = (e) => {
    this.props.registerClick();
  };

  render() {
    return (
      <div id="auth-section">
        <MobileLogo />
        <AuthHeader />
        <div className="container-fluid my-5 auth-forms">
          <div className="row">
            <div className="col" id="auth-navigator">
              <div>
                <p onClick={this.handleSignInClick} className="mr-4">
                  {this.props.signInOpen ? (
                    <span style={{ color: "#f76b1a" }}> Sign in</span>
                  ) : (
                    <span> Sign in</span>
                  )}
                </p>
              </div>
              |
              <div>
                <p onClick={this.handleRegisterClick} className="ml-4">
                  {!this.props.signInOpen ? (
                    <span style={{ color: "#f76b1a" }}> Register</span>
                  ) : (
                    <span> Register</span>
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {this.props.signInOpen ? (
                <LoginForm />
              ) : (
                <RegisterForm handleSignInClick={this.handleSignInClick} />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    signInOpen: state.auth.signInOpen,
  };
};
export default connect(mapStateToProps, { signInClick, registerClick })(
  Authenticate
);
