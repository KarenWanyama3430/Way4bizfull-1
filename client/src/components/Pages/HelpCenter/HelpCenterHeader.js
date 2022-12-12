import React from "react";

import "./HelpCenterHeader.css";
import Logo from "../../Header/Logo";
import { NavLink } from "react-router-dom";
import HamburgerMenu from "react-hamburger-menu";

class HelpCenterHeader extends React.Component {
  state = { open: false };
  handleClick = (e) => {
    this.setState((prevState) => {
      return {
        open: !prevState.open,
      };
    });
  };
  render() {
    return (
      <div id="help-center-header" className="primary-background">
        <Logo id="help-center-header-logo" />
        <ul className="helper-center-menu-items">
          <li>
            <NavLink to="/about-us" exact activeClassName="help-center-active">
              <p>Who We Are</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/terms">
              <p>T&Cs</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/help-center">
              <p>FAQs</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/return-policy">
              <p>Return Policy</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact-us">
              <p>Contact Us</p>
            </NavLink>
          </li>
        </ul>
        <div id="help-center-hamburger-wrapper">
          <div id="help-center-hamburger">
            {this.state.open ? (
              <HamburgerMenu
                width={30}
                height={20}
                color="#f76b1a"
                isOpen={true}
                menuClicked={this.handleClick}
              />
            ) : (
              <HamburgerMenu
                width={30}
                height={20}
                color="#f76b1a"
                isOpen={false}
                menuClicked={this.handleClick}
              />
            )}
          </div>
          {this.state.open ? (
            <div className="help-center-sm-menu">
              <ul id="help-center-sm-menu-items">
                <li>
                  <NavLink
                    to="/about-us"
                    exact
                    activeClassName="help-center-active"
                  >
                    <p>Who We Are</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/terms">
                    <p>T&Cs</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/help-center">
                    <p>FAQs</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/return-policy">
                    <p>Return Policy</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact-us">
                    <p>Contact Us</p>
                  </NavLink>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default HelpCenterHeader;
