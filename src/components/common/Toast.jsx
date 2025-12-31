import {
  faCheckCircle,
  faExclamationCircle,
  faInfoCircle,
  faTimes,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./Toast-slide.css";

const config = {
  success: {
    icon: faCheckCircle,
    color: "success",
  },
  error: {
    icon: faExclamationCircle,
    color: "error",
  },
  warning: {
    icon: faExclamationTriangle,
    color: "warning",
  },
  info: {
    icon: faInfoCircle,
    color: "info",
  },
};

function Toast({ message, type, onClose }) {
  const [show, setShow] = useState(true);
  const [animation, setAnimation] = useState("toast-slide-in");

  useEffect(() => {
    setShow(true);
    setAnimation("toast-slide-in");
    if (message) {
      const timer = setTimeout(() => {
        setAnimation("toast-slide-out");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleAnimationEnd = () => {
    if (animation === "toast-slide-out") {
      setShow(false);
      if (onClose) onClose();
    }
  };

  if (!show || !message) return null;

  const currentType = config[type] || config.info;

  const toastElement = (
    <div
      className={`app-toast toast-type-${currentType.color} ${animation}`}
      role="alert"
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="toast-content">
        <div className="toast-icon">
          <FontAwesomeIcon icon={currentType.icon} />
        </div>
        <div className="toast-body">{message}</div>
        <button
          className="toast-close"
          onClick={() => setAnimation("toast-slide-out")}
          aria-label="Close"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className="toast-progress-bar"></div>
    </div>
  );

  return createPortal(toastElement, document.body);
}

Toast.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(["success", "error", "warning", "info"]),
  onClose: PropTypes.func,
};

export default Toast;
