import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const WishlistSection = ({ navigate }) => {
  return (
    <div className="hoso-card">
      <div className="hoso-header">
        <h2 className="hoso-title">Sản phẩm yêu thích</h2>
        <p className="hoso-subtitle">Những bó hoa bạn đã lưu lại</p>
      </div>
      <div className="empty-state">
        <div className="empty-icon">
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <p>Danh sách yêu thích đang trống.</p>
        <button
          onClick={() => navigate("/categories")}
          className="shop-now-button"
        >
          Khám phá ngay
        </button>
      </div>
    </div>
  );
};

export default WishlistSection;
