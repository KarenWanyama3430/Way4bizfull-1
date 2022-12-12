import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { IconContext } from "react-icons";
import { RiDragDropLine } from "react-icons/ri";
import "./ReactDropZone.css";

const ReactDropzone = ({ setFiles }) => {
  const onDrop = useCallback(
    acceptedFiles => {
      setFiles(
        acceptedFiles.map(file => ({
          ...file,
          preview: URL.createObjectURL(file)
        }))
      );
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/*"
  });
  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive && "dropzone--isActive"}`}
    >
      <input className="products-upload-input" {...getInputProps()} />
      <IconContext.Provider value={{ className: "products-upload-icon" }}>
        <RiDragDropLine />
      </IconContext.Provider>
      <h4>Drop Image Here</h4>
    </div>
  );
};

export default ReactDropzone;
