import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory } from "@fortawesome/free-solid-svg-icons";

const OrderSection = ({ navigate }) => {
  return (
    <div className="hoso-card">
      <div className="hoso-header">
        <h2 className="hoso-title">Lịch sử đơn hàng</h2>
        <p className="hoso-subtitle">Danh sách các đơn hàng bạn đã mua</p>
      </div>
      <div className="empty-state">
        <div className="empty-icon">
          <FontAwesomeIcon icon={faHistory} />
        </div>
        <p>Bạn chưa có đơn hàng nào.</p>
        <button
          onClick={() => navigate("/categories")}
          className="shop-now-button"
        >
          Mua sắm ngay
        </button>
      </div>
    </div>
  );
};

export default OrderSection;
