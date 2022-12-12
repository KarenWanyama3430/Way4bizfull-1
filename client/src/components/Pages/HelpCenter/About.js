import React from "react";

import "./About.css";
import Footer from "../../Footer/Footer";
import HelpCenterHeader from "./HelpCenterHeader";
import MiniMenuWrapper from "../../MiniMenuWrapper/MiniMenuWrapper";
import { IoMdRocket } from "react-icons/io";
import { GiBinoculars } from "react-icons/gi";
import { BsGem } from "react-icons/bs";

class About extends React.Component {
  render() {
    return (
      <div className="main">
        <div className="content white-body">
          <HelpCenterHeader />
          <div
            className="container-fluid p-0"
            style={{ backgroundColor: "#fff" }}
          >
            <h3 style={{ textAlign: "center" }} className="my-2">
              About Us
            </h3>

            <div className="row mb-3">
              <div className="col-10 col-md-9 col-lg-8 mx-auto">
                <div className="row">
                  <div className="col-md-2 about-icon-wrapper">
                    <div className="about-icon-container">
                      <IoMdRocket
                        style={{ fontSize: "60px", color: "#f76b1a" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-10 about-us-text-wrapper">
                    <h4 style={{ textDecoration: "underline" }}>Our Mission</h4>
                    <div>
                      <p>
                        <strong>Make Life Easier:</strong> Provide timely,
                        convenient and efficient services to our customers,
                        individuals and society to the highest moral standards
                        of professionalism from our qualified staff using the
                        appropriate gadgets to help people move from where they
                        are today to a better place tomorrow.
                      </p>
                      <p>
                        <strong>Corporate Client:</strong> It should be put
                        forward as a fact that two (2) heads are better than one
                        and as much understanding determines how much success a
                        business will be able to actualize. Our perspective is
                        to partner and is the leading benefits advisors in the
                        middle market, offering independent solutions for
                        safety, welfare, and corporate client services
                        businesses. This is our way of helping you our potential
                        and visionary Corporate Client actualize your dream;
                        this also serves as an opportunity of creating an
                        awareness of our/your suitability to our costumer.
                      </p>
                      <p>
                        With the more fundamental economy backlash in the world,
                        our aspiration is to help intensify and galvanize the
                        backlash against trade and globalization. Our aim is to
                        have our Company based in other parts of the world.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-10 col-md-9 col-lg-8 mx-auto">
                <div className="row">
                  <div className="about-icon-wrapper col-md-2">
                    <div className="about-icon-container">
                      <GiBinoculars
                        style={{ fontSize: "60px", color: "#f76b1a" }}
                      />
                    </div>
                  </div>
                  <div className="col-md-10 about-us-text-wrapper">
                    <h4 style={{ textDecoration: "underline" }}>Our Vision</h4>
                    <div>
                      <p>
                        Way4Biz Agency's goal and vision is to become the major
                        leading and Successful company or entrepreneurs in
                        Africa by growing too thickly and coarsely and help over
                        million businesses rank in the world even the most
                        competitive Industries.
                      </p>
                      <p>
                        Our plan and strategy are based on being the preferred
                        goods distributors and peripherals service rendering
                        with high quality and innovative solutions that will
                        help organizations and businesses increase fertility.
                      </p>
                      <p>
                        The customer is the business and the success of the
                        business relies on the loyalty of the customer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-10 col-md-9 col-lg-8 mx-auto">
                <div className="row">
                  <div className="about-icon-wrapper col-md-2">
                    <div className="about-icon-container">
                      <BsGem style={{ fontSize: "60px", color: "#f76b1a" }} />
                    </div>
                  </div>
                  <div className="col-md-10 about-us-text-wrapper">
                    <h4 style={{ textDecoration: "underline" }}>Our Values</h4>
                    <div>
                      <p>
                        We insist on certain core values that not only define
                        Way4Biz organization but also a foundation for continued
                        growth and professional excellence:
                      </p>
                      <ul style={{ margin: "20px 0px 20px 30px" }}>
                        <li>
                          <p>
                            We listen to our customer's needs and provide
                            innovative, reliable services in support of their
                            needs.
                          </p>
                        </li>
                        <li>
                          <p>
                            We deliver definable quality and values so that our
                            customers are proud of us and recommend us to
                            others.
                          </p>
                        </li>
                        <li>
                          <p>
                            We continually improve our company and services in
                            accordance with our customers’ wishes. 
                          </p>
                        </li>
                      </ul>
                    </div>
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

export default About;
