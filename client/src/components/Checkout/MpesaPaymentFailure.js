import React from "react";

import "./MpesaPaymentFailure.css";

class MpesaPaymentFailure extends React.Component {
  render() {
    return (
      <div className="main">
        <div className="content">
          <Header />
          <div className="container">
            <div className="row">
              <div className="col-md-9 col-lg-8 mx-auto">
                <div className="box-container py-3 pl-2 pr-1"></div>
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

export default MpesaPaymentFailure;
