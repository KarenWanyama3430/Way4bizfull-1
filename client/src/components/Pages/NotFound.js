import React, { Component } from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";
export class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = { height: 512 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener(
      "resize",
      this.updateWindowDimensions.bind(this)
    );
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  show404Image() {
    let width = this.state.width;
    let height = this.state.height;
    if (width > 420 && height < 960) {
      return (
        <img width="100%" height="100%" src="/404smlw.png" alt="/404smlw.png" />
      );
    } else if (width > 960) {
      return (
        <img width="100%" height="100%" src="/404.png" alt="/404smlw.png" />
      );
    } else {
      return (
        <img width="100%" height="100%" src="/404sm.png" alt="/404smlw.png" />
      );
    }
  }
  render() {
    return (
      <div className="not-found-wrapper">
        {this.show404Image()}
        <div className="white-overlay container-fluid p-0">
          <div className="row align-items-center">
            <div className="col-md-6 col-sm-6">
              <p id="not-found-num">404</p>
            </div>
            <div className="col-md-6 col-sm-6 not-found-secondary-text">
              <h5>Ooops! You found me!</h5>
              <h6>You seem to have found a dead link.</h6>
              <Link to="/" className="btn btn-md take-me-home-btn mt-3">
                Take Me Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
