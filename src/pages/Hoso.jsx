import React, { useState, useEffect, useCallback } from "react";
import "./Hoso.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone, faEdit, faSave, faTimes, faLock, faHistory, faBell, faHeart, faChevronRight, faMapMarkerAlt, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Toast from "../components/common/Toast";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useAuth } from "../context/AuthContext";
import authService from "../api/authService";

const Hoso = () => {
  const { user, loading: authLoading, refreshStatus } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [activeTab, setActiveTab] = useState("profile");
  const [errors, setErrors] = useState({});

  const fetchUserProfile = useCallback(async () => {
    setFetching(true);
    try {
      // Assuming there's an endpoint to get user profile
      // For now, we'll use the data from AuthContext
      const profileData = await authService.getProfile();
      if (profileData) {
        setFormData({
          fullName: profileData.fullName || user?.fullName || "",
          email: profileData.email || "",
          phone: profileData.phone || "",
          address: profileData.address || "",
        });
      } else {
        // Fallback to user data from context
        setFormData({
          fullName: user?.fullName || "",
          email: "",
          phone: "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      // Fallback to user data from context
      setFormData({
        fullName: user?.fullName || "",
        email: "",
        phoner: "",
      });
    } finally {
      setFetching(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate("/login", { state: { from: "/hoso" } });
      } else {
        fetchUserProfile();
      }
    }
  }, [user, authLoading, navigate, fetchUserProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
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
    } else if (!/^[0-9]{10,11}$/.test(formData.phoneNumber.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ (10-11 số)";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ";
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

    setLoading(true);
    setMessage("");
    try {
      const data = await authService.updateProfile(formData);
      if (data.state) {
        setMessage("Cập nhật thông tin thành công");
        setToastType("success");
        setIsEditing(false);
        await refreshStatus(); // Refresh user data in context
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
    setIsEditing(false);
    fetchUserProfile(); // Reset form data
    setErrors({});
  };

  const renderProfile = () => (
    <div className="hoso-card">
      <div className="hoso-header">
        <h2 className="hoso-title">Hồ sơ của tôi</h2>
        <p className="hoso-subtitle">Quản lý thông tin cá nhân của bạn</p>
      </div>

      {!isEditing ? (
        <div className="hoso-view">
          <div className="profile-info">
            <div className="info-item">
              <div className="info-icon">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="info-content">
                <label>Họ và tên</label>
                <p>{formData.fullName || "Chưa cập nhật"}</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <div className="info-content">
                <label>Email</label>
                <p>{formData.email || "Chưa cập nhật"}</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <div className="info-content">
                <label>Số điện thoại</label>
                <p>{formData.phone || "Chưa cập nhật"}</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </div>
              <div className="info-content">
                <label>Địa chỉ</label>
                <p>{formData.address || "Chưa cập nhật"}</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="edit-button"
            onClick={() => setIsEditing(true)}
          >
            <FontAwesomeIcon icon={faEdit} />
            Chỉnh sửa thông tin
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="hoso-form">
          <div className="form-group">
            <label htmlFor="fullName">
              <FontAwesomeIcon icon={faUser} /> Họ và tên
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Nhập họ và tên"
              className={errors.fullName ? "error" : ""}
            />
            {errors.fullName && (
              <span className="error-message">{errors.fullName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} /> Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Nhập email"
              className={errors.email ? "error" : ""}
              readOnly
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">
              <FontAwesomeIcon icon={faPhone} /> Số điện thoại
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Nhập số điện thoại"
              className={errors.phone ? "error" : ""}
            />
            {errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="address">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> Địa chỉ
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Nhập địa chỉ"
              className={errors.address ? "error" : ""}
            />
            {errors.address && (
              <span className="error-message">{errors.address}</span>
            )}
          </div>

          <div className="form-actions">
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
          </div>
        </form>
      )}
    </div>
  );

  const renderChangePassword = () => (
    <div className="hoso-card">
      <div className="hoso-header">
        <h2 className="hoso-title">Đổi mật khẩu</h2>
        <p className="hoso-subtitle">Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</p>
      </div>
      <form className="hoso-form">
        <div className="form-group">
          <label>Mật khẩu hiện tại</label>
          <input type="password" placeholder="Nhập mật khẩu hiện tại" />
        </div>
        <div className="form-group">
          <label>Mật khẩu mới</label>
          <input type="password" placeholder="Nhập mật khẩu mới" />
        </div>
        <div className="form-group">
          <label>Xác nhận mật khẩu mới</label>
          <input type="password" placeholder="Xác nhận mật khẩu mới" />
        </div>
        <button type="button" className="save-button">Đổi mật khẩu</button>
      </form>
    </div>
  );

  const renderOrderHistory = () => (
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
        <button onClick={() => navigate("/categories")} className="shop-now-button">Mua sắm ngay</button>
      </div>
    </div>
  );

  const renderNotifications = () => (
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

  const renderWishlist = () => (
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
        <button onClick={() => navigate("/categories")} className="shop-now-button">Khám phá ngay</button>
      </div>
    </div>
  );

  const sidebarItems = [
    { id: "profile", label: "Hồ sơ", icon: faUser },
    { id: "password", label: "Đổi mật khẩu", icon: faLock },
    { id: "orders", label: "Đơn hàng", icon: faHistory },
    { id: "notifications", label: "Thông báo", icon: faBell },
    { id: "wishlist", label: "Yêu thích", icon: faHeart },
  ];

  if (authLoading || fetching) {
    return (
      <div className="hoso-page">
        <div className="container">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="hoso-page">
      <div className="container" style={{ maxWidth: "1200px" }}>
        <button 
          className="back-page-button" 
          onClick={() => navigate(-1)}
          title="Quay lại"
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Quay lại
        </button>
      </div>
      <div className="container hoso-layout">
        <div className="hoso-sidebar">
          <div className="user-short-info">
            <div className="user-avatar-circle">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="user-text-info">
              <p className="user-name">{user?.fullName || "Khách"}</p>
              <p className="user-edit-link" onClick={() => setActiveTab("profile")}>
                <FontAwesomeIcon icon={faEdit} /> Sửa hồ sơ
              </p>
            </div>
          </div>
          
          <ul className="sidebar-menu">
            {sidebarItems.map((item) => (
              <li 
                key={item.id} 
                className={activeTab === item.id ? "active" : ""}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsEditing(false);
                }}
              >
                <div className="menu-item-content">
                  <div className="menu-icon">
                    <FontAwesomeIcon icon={item.icon} />
                  </div>
                  <span>{item.label}</span>
                </div>
                <FontAwesomeIcon icon={faChevronRight} className="chevron" />
              </li>
            ))}
          </ul>
        </div>

        <div className="hoso-content">
          {activeTab === "profile" && renderProfile()}
          {activeTab === "password" && renderChangePassword()}
          {activeTab === "orders" && renderOrderHistory()}
          {activeTab === "notifications" && renderNotifications()}
          {activeTab === "wishlist" && renderWishlist()}
        </div>
      </div>
      {message && <Toast message={message} type={toastType} />}
    </div>
  );
};

export default Hoso;

