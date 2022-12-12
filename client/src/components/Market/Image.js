import React, { Component } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./Image.css";
export class Image extends Component {
  text = React.createRef();
  componentDidMount() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = image.dataset.src;
          imageObserver.unobserve(image);
        }
      });
    });

    imageObserver.observe(this.text.current);
  }
  componentDidUpdate() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = image.dataset.src;
          imageObserver.unobserve(image);
        }
      });
    });

    imageObserver.observe(this.text.current);
  }
  render() {
    return (
      <React.Fragment>
        <img
          className="loading image-overlay"
          data-src={this.props.image}
          ref={this.text}
          src={this.props.spinner ? this.props.heroImage : "/load.jpg"}
          alt={this.props.alt}
          height={this.props.height}
          width={this.props.width}
          style={{ margin: "auto", cursor: "pointer" }}
        />
      </React.Fragment>
    );
  }
}

export default Image;
