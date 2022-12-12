import React from "react";

const ContactTextArea = props => {
  return (
    <React.Fragment>
      <label htmlFor="contact-message">Message</label>
      <textarea
        className="form-control"
        id="contact-message"
        {...props.input}
      ></textarea>
      <div style={{ color: "red" }}>
        {props.meta.touched && props.meta.error}
      </div>
    </React.Fragment>
  );
};

export default ContactTextArea;
