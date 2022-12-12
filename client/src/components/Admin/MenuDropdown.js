import React from "react";

import "./MenuDropdown.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { NavLink } from "react-router-dom";

class MenuDropdown extends React.Component {
  componentDidMount() {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");

        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
  }

  showSmMenuItemBadges(name, props) {
    if (name === "Members") {
      if (props.newSellers > 0) {
        return (
          <span
            className="ml-1 badge"
            style={{ backgroundColor: "#f76b1a", color: "#fff" }}
          >
            {props.newSellers}
          </span>
        );
      } else {
        return;
      }
    } else if (name === "Products") {
      if (props.newProducts > 0) {
        return (
          <span
            className="ml-1 badge"
            style={{ backgroundColor: "#f76b1a", color: "#fff" }}
          >
            {props.newProducts}
          </span>
        );
      } else {
        return;
      }
    } else {
      return;
    }
  }
  render() {
    const { parentKey, childKeys } = this.props.data;
    return (
      <div>
        <span className="accordion">
          {parentKey[0]}
          {this.props.newSellers > 0 ? (
            <span
              className="ml-1 badge"
              style={{ backgroundColor: "#f76b1a", color: "#fff" }}
            >
              {this.props.newSellers}
            </span>
          ) : null}

          <MdKeyboardArrowDown className="ml-1" />
        </span>
        <div className="my-panel">
          {childKeys.map((childKey) => (
            <p key={Math.random()}>
              <NavLink
                activeClassName="admin-active-lg-link"
                to={childKey.url}
                style={{ width: "100%" }}
              >
                {childKey.name}
                <span>
                  {this.showSmMenuItemBadges(childKey.name, this.props)}
                </span>
              </NavLink>
            </p>
          ))}
        </div>
      </div>
    );
  }
}

export default MenuDropdown;
