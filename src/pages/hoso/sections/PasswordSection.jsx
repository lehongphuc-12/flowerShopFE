import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faSave } from "@fortawesome/free-solid-svg-icons";
import authService from "../../../api/authService";
import Toast from "../../../components/common/Toast";

const PasswordSection = ({ isAccountGG }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!isAccountGG && !formData.currentPassword) {
      newErrors.currentPassword = "Vui lòng nhập mật khẩu hiện tại";
    }
    if (!formData.newPassword) {
      newErrors.newPassword = "Vui lòng nhập mật khẩu mới";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Mật khẩu mới phải có ít nhất 6 ký tự";
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await authService.changePassword({
        oldPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      if (response && String(response.state) === "true") {
        setMessage("Đổi mật khẩu thành công");
        setToastType("success");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        setMessage(response?.message || "Đổi mật khẩu thất bại");
        setToastType("error");
      }
    } catch (error) {
      console.error("Change password error:", error);
      setMessage(
        error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại sau."
      );
      setToastType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hoso-card">
      <div className="hoso-header">
        <h2 className="hoso-title">Đổi mật khẩu</h2>
        <p className="hoso-subtitle">
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
        </p>
      </div>
      <form className="hoso-form" onSubmit={handleSubmit}>
        {!isAccountGG && (
          <div className="profile-field-box editing">
            <div className="field-icon">
              <FontAwesomeIcon icon={faLock} />
            </div>
            <div className="field-content">
              <label>Mật khẩu hiện tại</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Nhập mật khẩu hiện tại"
              />
              {errors.currentPassword && (
                <span className="error-message">{errors.currentPassword}</span>
              )}
            </div>
          </div>
        )}

        <div className="profile-field-box editing">
          <div className="field-icon">
            <FontAwesomeIcon icon={faLock} />
          </div>
          <div className="field-content">
            <label>Mật khẩu mới</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Nhập mật khẩu mới"
            />
            {errors.newPassword && (
              <span className="error-message">{errors.newPassword}</span>
            )}
          </div>
        </div>

        <div className="profile-field-box editing">
          <div className="field-icon">
            <FontAwesomeIcon icon={faLock} />
          </div>
          <div className="field-content">
            <label>Xác nhận mật khẩu mới</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Xác nhận mật khẩu mới"
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="save-button" disabled={loading}>
            <FontAwesomeIcon icon={faSave} />{" "}
            {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
          </button>
        </div>
      </form>
      {message && (
        <Toast
          message={message}
          type={toastType}
          onClose={() => setMessage("")}
        />
      )}
    </div>
  );
};

export default PasswordSection;
