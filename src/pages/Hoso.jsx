import React, { useState, useEffect } from "react";
import "./Hoso.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faHistory,
  faBell,
  faHeart,
  faChevronRight,
  faArrowLeft,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useAuth } from "../hooks/useAuth";

// Import Sections
import ProfileSection from "./hoso/sections/ProfileSection";
import PasswordSection from "./hoso/sections/PasswordSection";
import OrderSection from "./hoso/sections/OrderSection";
import NotificationSection from "./hoso/sections/NotificationSection";
import WishlistSection from "./hoso/sections/WishlistSection";

const Hoso = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate("/login", { state: { from: "/hoso" } });
      }
    }
  }, [user, authLoading, navigate]);

  const sidebarItems = [
    { id: "profile", label: "Hồ sơ", icon: faUser },
    { id: "password", label: "Đổi mật khẩu", icon: faLock },
    { id: "orders", label: "Đơn hàng", icon: faHistory },
    { id: "notifications", label: "Thông báo", icon: faBell },
    { id: "wishlist", label: "Yêu thích", icon: faHeart },
  ];

  // [FIX] If we have user, don't show loading spinner, just show content.
  // Only show spinner if we have NO user AND are loading (initial load).
  if (authLoading && !user) {
    return (
      <div className="hoso-page">
        <div className="container">
          <LoadingSpinner message="Đang tải" />
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
          {activeTab === "profile" && <ProfileSection />}
          {activeTab === "password" && (
            <PasswordSection isAccountGG={user.isAccountGG} />
          )}
          {activeTab === "orders" && <OrderSection navigate={navigate} />}
          {activeTab === "notifications" && <NotificationSection />}
          {activeTab === "wishlist" && <WishlistSection navigate={navigate} />}
        </div>
      </div>
    </div>
  );
};

export default Hoso;
