import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./NotFound.css";

const NotFound = ({ 
  message = "Không tìm thấy sản phẩm nào phù hợp!", 
  showBackButton = true,
  onBack 
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-icon-box">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="icon-search" />
          <div className="icon-pulse"></div>
        </div>
        <h2 className="not-found-title">Rất tiếc!</h2>
        <p className="not-found-text">{message}</p>
        
        {showBackButton && (
          <button className="not-found-back-btn" onClick={handleBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Quay lại trang trước</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default NotFound;
