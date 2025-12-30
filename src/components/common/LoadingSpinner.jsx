import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = ({ message = "Đang tải sản phẩm..." }) => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
};

export default LoadingSpinner;
