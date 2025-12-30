import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faEdit,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const ProfileSection = ({
  formData,
  isEditing,
  loading,
  errors,
  handleChange,
  handleFileChange,
  handleSubmit,
  handleCancel,
  setIsEditing,
}) => {
  return (
    <div className="hoso-card">
      <div className="hoso-header">
        <h2 className="hoso-title">Hồ sơ của tôi</h2>
        <p className="hoso-subtitle">Quản lý thông tin cá nhân của bạn</p>
      </div>

      <div className="form-layout-grid">
        <div className="avatar-side">
          <h2>Ảnh đại diện</h2>
          <div className={`profile-avatar-group ${!isEditing ? "view" : ""}`}>
            <div className="profile-avatar-container">
              {formData.imgUrl ? (
                <img src={formData.imgUrl} alt="Avatar" />
              ) : (
                <div className="placeholder">
                  <FontAwesomeIcon icon={faUser} />
                </div>
              )}
            </div>

            {isEditing && (
              <div className="file-input-wrapper">
                <button type="button" className="file-input-button">
                  Chọn ảnh
                </button>
                <input
                  type="file"
                  id="imgUrl"
                  name="imgUrl"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            )}
          </div>
        </div>

        <div className="fields-side">
          <form
            onSubmit={isEditing ? handleSubmit : (e) => e.preventDefault()}
            className="hoso-form"
          >
            <div className="form-row">
              <div
                className={`profile-field-box ${isEditing ? "editing" : ""}`}
              >
                <div className="field-icon">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="field-content">
                  <label>Họ và tên</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Nhập họ và tên"
                    />
                  ) : (
                    <p>{formData.fullName || "Chưa cập nhật"}</p>
                  )}
                  {isEditing && errors.fullName && (
                    <span className="error-message">{errors.fullName}</span>
                  )}
                </div>
              </div>

              <div
                className={`profile-field-box ${isEditing ? "editing" : ""}`}
              >
                <div className="field-icon">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div className="field-content">
                  <label>Số điện thoại</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Nhập số điện thoại"
                    />
                  ) : (
                    <p>{formData.phone || "Chưa cập nhật"}</p>
                  )}
                  {isEditing && errors.phone && (
                    <span className="error-message">{errors.phone}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="form-row single-field">
              <div
                className={`profile-field-box ${isEditing ? "editing" : ""}`}
              >
                <div className="field-icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div className="field-content">
                  <label>Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      readOnly
                      style={{ opacity: 0.7, cursor: "not-allowed" }}
                    />
                  ) : (
                    <p>{formData.email || "Chưa cập nhật"}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="form-row single-field">
              <div
                className={`profile-field-box ${isEditing ? "editing" : ""}`}
              >
                <div className="field-icon">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </div>
                <div className="field-content">
                  <label>Địa chỉ</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Nhập địa chỉ"
                    />
                  ) : (
                    <p>{formData.address || "Chưa cập nhật"}</p>
                  )}
                  {isEditing && errors.address && (
                    <span className="error-message">{errors.address}</span>
                  )}
                </div>
              </div>
            </div>

            <div className={isEditing ? "form-actions" : "view-actions"}>
              {!isEditing ? (
                <button
                  type="button"
                  className="edit-button"
                  onClick={setIsEditing}
                >
                  <FontAwesomeIcon icon={faEdit} />
                  Chỉnh sửa thông tin
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="save-button"
                    disabled={loading}
                  >
                    <FontAwesomeIcon icon={faSave} />
                    {loading ? "Đang lưu..." : "Lưu thay đổi"}
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
