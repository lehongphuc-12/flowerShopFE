import React, { useEffect, useState } from "react";
import "../layout/Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const logOutHandle = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "Chào mừng bạn quay trở lại!",
      read: false,
      time: "Vừa xong",
    },
    {
      id: 2,
      text: "Đơn hàng #SH123 đang được chuẩn bị",
      read: false,
      time: "5 phút trước",
    },
    {
      id: 3,
      text: "Bó hoa 'Nắng Hạ' đã có hàng lại",
      read: true,
      time: "1 giờ trước",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const userName = user?.fullName;
  return (
    <nav id="top">
      <div className="container">
        <div className="nav float-left">Hotline: 0788580223</div>
        <div className="nav float-right">
          <ul className="list-inline">
            <li className="list-inline-item">
              {userName ? (
                <div className="user-dropdown">
                  <div className="user-dropdown-toggle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 nav-icon"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 1 12 15.75c-2.213 0-4.204.957-5.582 2.475M15 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM2.25 12a9.75 9.75 0 1 1 19.5 0 9.75 9.75 0 0 1-19.5 0Z"
                      />
                    </svg>
                    <span>{userName}</span>
                  </div>
                  <ul className="user-dropdown-menu">
                    <li>
                      <Link to="/hoso">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                          />
                        </svg>
                        Hồ sơ
                      </Link>
                    </li>
                    <li>
                      <a onClick={logOutHandle}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                          />
                        </svg>
                        Đăng xuất
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/login" state={{ from: location.pathname }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 nav-icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  <span>Đăng nhập</span>
                </Link>
              )}
            </li>
            <li className="list-inline-item">
              <a href="/cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 nav-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>

                {/* <span>Giỏ hàng</span> */}
              </a>
            </li>
            <li className="list-inline-item">
              <a href="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 nav-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                  />
                </svg>

                {/* <span>Thanh toán</span> */}
              </a>
            </li>
            {userName && (
              <li className="list-inline-item">
                <div className="user-dropdown">
                  <div className="nav-notification">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 nav-icon"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                      />
                    </svg>
                    {unreadCount > 0 && (
                      <span className="notification-badge">{unreadCount}</span>
                    )}
                  </div>
                  <div className="user-dropdown-menu notification-dropdown">
                    <div className="notification-header">
                      <h3>Thông báo</h3>
                      <div className="notification-actions">
                        <button onClick={markAllRead}>Đã đọc hết</button>
                        <button onClick={clearAll}>Xóa tất cả</button>
                      </div>
                    </div>
                    <ul className="notification-list">
                      {notifications.length > 0 ? (
                        notifications.map((n) => (
                          <li key={n.id} className={n.read ? "read" : "unread"}>
                            <div className="notif-dot"></div>
                            <div className="notif-content">
                              <p>{n.text}</p>
                              <span>{n.time}</span>
                            </div>
                          </li>
                        ))
                      ) : (
                        <li className="empty-notif">Không có thông báo nào</li>
                      )}
                    </ul>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
