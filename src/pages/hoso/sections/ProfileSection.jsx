import React, { useState, useEffect, useCallback } from "react";
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
import { useAuth } from "../../../hooks/useAuth";
import authService from "../../../api/authService";
import axios from "axios";
import Toast from "../../../components/common/Toast";
import LoadingSpinner from "../../../components/common/LoadingSpinner";

const ProfileSection = () => {
  const { user, refreshStatus } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [message, setMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    imgUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [backupData, setBackupData] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchUserProfile = useCallback(async () => {
    setFetching(true);
    try {
      const profileData = await authService.getProfile();
      if (profileData) {
        setFormData({
          fullName: profileData.fullName || user?.fullName || "",
          email: profileData.email || "",
          phone: profileData.phone || "",
          address: profileData.address || "",
          imgUrl: profileData.imgUrl || user?.imgUrl || "",
        });
      } else {
        setFormData({
          fullName: user?.fullName || "",
          email: "",
          phone: "",
          imgUrl: user?.imgUrl || "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setFormData({
        fullName: user?.fullName || "",
        email: "",
        phone: "",
      });
    } finally {
      setFetching(false);
      setHasFetched(true);
    }
  }, [user]);

  useEffect(() => {
    if (user && !hasFetched) {
      fetchUserProfile();
    }
  }, [user, hasFetched, fetchUserProfile]);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setMessage("Ảnh quá lớn. Vui lòng chọn ảnh dưới 2MB");
        setToastType("error");
        return;
      }

      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          imgUrl: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ và tên";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ (10-11 số)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setMessage("Vui lòng kiểm tra lại thông tin");
      setToastType("error");
      return;
    }

    const isChanged =
      Object.keys(formData).some(
        (key) => formData[key] !== (backupData ? backupData[key] : "")
      ) || selectedFile !== null;

    if (!isChanged) {
      setMessage("Không có thay đổi nào để cập nhật");
      setToastType("info");
      setIsEditing(false);
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const submitData = new FormData();
      submitData.append("fullName", formData.fullName);
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone);
      submitData.append("address", formData.address || "");

      if (selectedFile) {
        submitData.append("imgUrl", selectedFile);
      }

      const response = await axios.put("/api/users/updateProfile", submitData);
      const data = response.data;

      if (data.state) {
        setMessage("Cập nhật thông tin thành công");
        setToastType("success");
        setIsEditing(false);
        setSelectedFile(null);
        refreshStatus();
      } else {
        setMessage(data.message || "Cập nhật thất bại. Vui lòng thử lại!");
        setToastType("error");
      }
    } catch (error) {
      console.error("Update profile error:", error);
      setMessage(error.message || "Có lỗi xảy ra. Vui lòng thử lại!");
      setToastType("error");
    }
    setLoading(false);
  };

  const handleCancel = () => {
    if (backupData) {
      setFormData(backupData);
    }
    setIsEditing(false);
    setSelectedFile(null);
    setErrors({});
  };

  const handleStartEdit = () => {
    setBackupData({ ...formData });
    setIsEditing(true);
  };

  // if (fetching) {
  //   return <LoadingSpinner message="Đang tải thông tin..." />;
  // }

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
                  onClick={handleStartEdit}
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

export default ProfileSection;
