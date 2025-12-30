import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faSave } from "@fortawesome/free-solid-svg-icons";

const PasswordSection = () => {
  return (
    <div className="hoso-card">
      <div className="hoso-header">
        <h2 className="hoso-title">Đổi mật khẩu</h2>
        <p className="hoso-subtitle">
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
        </p>
      </div>
      <form className="hoso-form">
        <div className="profile-field-box editing">
          <div className="field-icon">
            <FontAwesomeIcon icon={faLock} />
          </div>
          <div className="field-content">
            <label>Mật khẩu hiện tại</label>
            <input type="password" placeholder="Nhập mật khẩu hiện tại" />
          </div>
        </div>

        <div className="profile-field-box editing">
          <div className="field-icon">
            <FontAwesomeIcon icon={faLock} />
          </div>
          <div className="field-content">
            <label>Mật khẩu mới</label>
            <input type="password" placeholder="Nhập mật khẩu mới" />
          </div>
        </div>

        <div className="profile-field-box editing">
          <div className="field-icon">
            <FontAwesomeIcon icon={faLock} />
          </div>
          <div className="field-content">
            <label>Xác nhận mật khẩu mới</label>
            <input type="password" placeholder="Xác nhận mật khẩu mới" />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="save-button">
            <FontAwesomeIcon icon={faSave} /> Đổi mật khẩu
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordSection;
