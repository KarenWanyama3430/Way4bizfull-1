import React from "react";

import "./Contact.css";
import HelpCenterHeader from "./HelpCenterHeader";
import Footer from "../../Footer/Footer";
import MiniMenuWrapper from "../../MiniMenuWrapper/MiniMenuWrapper";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import ContactInput from "./ContactInput";
import ContactTextArea from "./ContactTextArea";
import ContactSelect from "./ContactSelect";
import { contactUs } from "../../../redux/actions";
import { withRouter } from "react-router-dom";

class Contact extends React.Component {
  render() {
    const options = [
      { key: "suggestion", text: "Suggestion" },
      { key: "feedback", text: "Feedback" },
    ];
    return (
      <div className="main">
        <div className="content white-body">
          <HelpCenterHeader />
          <div
            className="container-fluid p-0 m-0"
            style={{ backgroundColor: "#fff" }}
          >
            <div className="container">
              <h3 style={{ textAlign: "center" }} className="mt-3">
                Contact Us
              </h3>
              <form
                onSubmit={this.props.handleSubmit(
                  ({ reason, subject, message }) =>
                    this.props.contactUs(
                      { reason, subject, message },
                      this.props.hsitory
                    )
                )}
                className="form-group mt-4"
                id="contact-form"
              >
                <Field
                  component={ContactSelect}
                  options={options}
                  name="reason"
                />
                <div className="row">
                  <Field
                    name="firstName"
                    id="contact-first-name"
                    label="First Name"
                    divClassName="col-md-6"
                    inputClassName="form-control"
                    type="text"
                    component={ContactInput}
                  />
                  <Field
                    name="lastName"
                    id="contact-last-name"
                    label="Last Name"
                    divClassName="col-md-6"
                    inputClassName="form-control"
                    type="text"
                    component={ContactInput}
                  />
                </div>
                <Field
                  name="email"
                  id="contact-email"
                  label="Email"
                  inputClassName="form-control"
                  type="text"
                  component={ContactInput}
                />
                <Field
                  name="subject"
                  id="contact-subject"
                  label="Subject"
                  inputClassName="form-control"
                  type="text"
                  component={ContactInput}
                />

                <Field name="message" component={ContactTextArea} />

                <button
                  disabled={this.props.pristine || this.props.invalid}
                  className="btn btn-block contact-btn my-3"
                >
                  {this.props.contactUsLoading && (
                    <span
                      className="spinner-grow spinner-grow-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                  {this.props.contactUsLoading ? (
                    <span> {"  "}Loading...</span>
                  ) : (
                    <span>Send</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
        <MiniMenuWrapper />
      </div>
    );
  }
}
const validate = (formValues) => {
  const errors = {};
  if (
    !formValues.subject ||
    (formValues.subject && !formValues.subject.trim())
  ) {
    errors.subject = "Please add a subject";
  }
  if (
    !formValues.message ||
    (formValues.message && formValues.message.trim().length < 20)
  ) {
    errors.message = "Please enter a message of 20 characters or more";
  }
  if (!formValues.reason) {
    errors.reason = "Please choose a valid reason";
  }
  if (formValues.reason === "choose") {
    errors.reason = "Please choose a valid reason";
  }
  return errors;
};
const mapStateToProps = (state) => {
  return {
    initialValues: state.auth.user,
    contactUsLoading: state.auth.contactUsLoading,
  };
};
export default withRouter(
  connect(mapStateToProps, { contactUs })(
    reduxForm({ form: "Contact", validate })(Contact)
  )
);
