import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const NotificationSection = () => {
  return (
    <div className="hoso-card">
      <div className="hoso-header">
        <h2 className="hoso-title">Thông báo</h2>
        <p className="hoso-subtitle">Cập nhật những tin tức mới nhất</p>
      </div>
      <div className="empty-state">
        <div className="empty-icon">
          <FontAwesomeIcon icon={faBell} />
        </div>
        <p>Hiện không có thông báo nào.</p>
      </div>
    </div>
  );
};

export default NotificationSection;
