import React, { useState, useEffect, useCallback } from "react";
import "./Hoso.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEdit,
  faLock,
  faHistory,
  faBell,
  faHeart,
  faChevronRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Toast from "../components/common/Toast";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useAuth } from "../hooks/useAuth";
import authService from "../api/authService";

// Import Sections
import ProfileSection from "./hoso/sections/ProfileSection";
import PasswordSection from "./hoso/sections/PasswordSection";
import OrderSection from "./hoso/sections/OrderSection";
import NotificationSection from "./hoso/sections/NotificationSection";
import WishlistSection from "./hoso/sections/WishlistSection";

const Hoso = () => {
  const { user, loading: authLoading, refreshStatus } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [message, setMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    imgUrl: "",
  });
  const [activeTab, setActiveTab] = useState("profile");
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
    if (!authLoading) {
      if (!user) {
        navigate("/login", { state: { from: "/hoso" } });
      } else if (activeTab === "profile" && !hasFetched) {
        fetchUserProfile();
      }
    }
  }, [user, authLoading, navigate, fetchUserProfile, activeTab, hasFetched]);

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
        await refreshStatus();
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
    setErrors({});
  };

  const handleStartEdit = () => {
    setBackupData({ ...formData });
    setIsEditing(true);
  };

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
            {user?.imgUrl ? (
              <img src={user?.imgUrl} alt="" />
            ) : (
              <div className="user-avatar-circle">
                <FontAwesomeIcon icon={faUser} />
              </div>
            )}
            <div className="user-text-info">
              <p className="user-name">{user?.fullName || "Khách"}</p>
              <p
                className="user-edit-link"
                onClick={() => setActiveTab("profile")}
              >
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
          {activeTab === "profile" && (
            <ProfileSection
              formData={formData}
              isEditing={isEditing}
              loading={loading}
              errors={errors}
              handleChange={handleChange}
              handleFileChange={handleFileChange}
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
              setIsEditing={handleStartEdit}
            />
          )}
          {activeTab === "password" && <PasswordSection />}
          {activeTab === "orders" && <OrderSection navigate={navigate} />}
          {activeTab === "notifications" && <NotificationSection />}
          {activeTab === "wishlist" && <WishlistSection navigate={navigate} />}
        </div>
      </div>
      {message && <Toast message={message} type={toastType} />}
    </div>
  );
};

export default Hoso;
