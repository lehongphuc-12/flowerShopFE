import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import './Toast-slide.css';

// Lưu ý: Đảm bảo đã cài đặt Bootstrap và import CSS của nó ở project

const typeMap = {
  success: 'bg-success text-white',
  error: 'bg-danger text-white',
  warning: 'bg-warning text-dark',
  info: 'bg-info text-white',
};

function Toast({ message, type }) {
  const [show, setShow] = useState(true);
  const [animation, setAnimation] = useState('toast-slide-in');

  useEffect(() => {
    setShow(true);
    setAnimation('toast-slide-in');
    if (message) {
      const timer = setTimeout(() => {
        setAnimation('toast-slide-out');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Ẩn hẳn khi animation kết thúc
  const handleAnimationEnd = () => {
    if (animation === 'toast-slide-out') {
      setShow(false);
    }
  };

  if (!show) return null;

  return (
    <div
      className={`toast show align-items-center ${typeMap[type] || 'bg-secondary text-white'} ${animation}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      style={{ position: 'fixed', top: 20, right: 20, minWidth: 100, minHeight: 50 ,zIndex: 9999, borderRadius: "5px" }}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="d-flex">
        <div className="toast-body">
          {message}
        </div>
        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
          onClick={() => setAnimation('toast-slide-out')}
        ></button>
      </div>
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
};

export default Toast;
