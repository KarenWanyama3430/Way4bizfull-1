import React, { Component } from "react";
import { createRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./ReactCropper.css";
export class ReactCropper extends Component {
  cropper = createRef();
  cropImage = () => {
    const { setImage } = this.props;
    if (typeof this.cropper.current.getCroppedCanvas() === "undefined") {
      return;
    }
    this.cropper.current.getCroppedCanvas().toBlob(blob => {
      setImage(blob);
    }, "image/*");
  };
  render() {
    const { imagePreview } = this.props;
    return (
      <Cropper
        ref={this.cropper}
        src={imagePreview}
        style={{ height: "250px", width: "100%" }}
        preview=".img-preview"
        aspectRatio={this.props.admin || 1}
        viewMode={1}
        dragMode="move"
        guides={false}
        scalable={true}
        cropBoxMovable={false}
        cropBoxResizable={true}
        crop={this.cropImage}
      />
    );
  }
}

export default ReactCropper;
