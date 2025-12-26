import React, { useEffect, useState } from "react";
import "../layout/Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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
                  <span
                    className="user-dropdown-toggle"
                    tabIndex={0}
                    style={{ marginRight: "10px", cursor: "pointer" }}
                  >
                    {userName}
                  </span>
                  <ul
                    className="user-dropdown-menu"
                    style={{
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                      position: "absolute",
                      top: "20px",
                    }}
                  >
                    <li>
                      <a href="/profile">Hồ sơ</a>
                    </li>
                    <li>
                      <a onClick={logOutHandle}>Đăng xuất</a>
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

                <span>Giỏ hàng</span>
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

                <span>Thanh toán</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
