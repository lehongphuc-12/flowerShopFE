import React, { useState } from "react";
import "./Register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../components/common/Toast";
import authService from "../api/authService";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [toastType, setToastType] = useState("info");
  const navigate = useNavigate();

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

  // const validateForm = () => {
  //   const newErrors = {};

  //   if (!formData.fullName.trim()) {
  //     newErrors.fullName = "Vui lòng nhập họ và tên";
  //   }

  //   if (!formData.email.trim()) {
  //     newErrors.email = "Vui lòng nhập email";
  //   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
  //     newErrors.email = "Email không hợp lệ";
  //   }

  //   if (!formData.phoneNumber.trim()) {
  //     newErrors.phoneNumber = "Vui lòng nhập số điện thoại";
  //   } else if (!/^[0-9]{10,11}$/.test(formData.phoneNumber.replace(/\s/g, ""))) {
  //     newErrors.phoneNumber = "Số điện thoại không hợp lệ";
  //   }

  //   if (!formData.password) {
  //     newErrors.password = "Vui lòng nhập mật khẩu";
  //   } else if (formData.password.length < 6) {
  //     newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
  //   }

  //   if (!formData.confirmPassword) {
  //     newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
  //   } else if (formData.password !== formData.confirmPassword) {
  //     newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
  //   }

  //   if (!acceptTerms) {
  //     newErrors.acceptTerms = "Vui lòng đồng ý với điều khoản";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const data = await authService.register(formData);
      if (data.state) {
        setMessage(data.message);
        setToastType("success");
        setTimeout(() => navigate("/login"), 1000); // Redirect to login after successful register
      } else {
        setMessage(data.message || "Đăng kí thất bại");
        setToastType("error");
      }
    } catch (error) {
      console.error("Register error:", error);
      const errorMessage = error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại!";
      setMessage(errorMessage);
      setToastType("error");
    }
    setLoading(false);
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="register-page">
      <div className="container">
        <div className="register-container">
          <div className="register-intro">
            <h2 className="register-title">Đăng ký</h2>
            <p className="register-subtitle">Tạo tài khoản mới của bạn</p>
          </div>
          <div className="register-card">
            {/* <h2 className="register-title">Đăng ký</h2>
            <p className="register-subtitle">Tạo tài khoản mới của bạn</p> */}
            <div className="social-register">
              <button className="social-button facebook">
                <FontAwesomeIcon icon={faFacebook} />
              </button>
              <button className="social-button google">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              </button>
            </div>
            <div className="register-divider">
              <span>Hoặc</span>
            </div>
            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-row two-cols">
                <div className="form-group">
                  <label htmlFor="fullName">Họ và tên</label>
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
                  <label htmlFor="phone">Số điện thoại</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại"
                    className={errors.phoneNumber ? "error" : ""}
                  />
                  {errors.phoneNumber && (
                    <span className="error-message">{errors.phoneNumber}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Nhập email"
                  className={errors.email ? "error" : ""}
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">Mật khẩu</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                    className={errors.password ? "error" : ""}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => togglePasswordVisibility("password")}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </button>
                </div>
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Nhập lại mật khẩu"
                    className={errors.confirmPassword ? "error" : ""}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                  >
                    <FontAwesomeIcon
                      icon={showConfirmPassword ? faEye : faEyeSlash}
                    />
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="error-message">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="terms-checkbox">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                  />
                  <span>
                    Tôi đồng ý với{" "}
                    <a href="/terms" target="_blank" rel="noopener noreferrer">
                      Điều khoản và Điều kiện
                    </a>{" "}
                    và{" "}
                    <a
                      href="/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Chính sách Bảo mật
                    </a>
                  </span>
                </label>
                {errors.acceptTerms && (
                  <span className="error-message">{errors.acceptTerms}</span>
                )}
              </div>

              <button
                type="submit"
                className="register-button"
                disabled={loading}
              >
                {loading ? "Đang đăng kí..." : "Đăng kí"}
              </button>
            </form>
            {message && <Toast message={message} type={toastType} />}
            <div className="login-link">
              <p>
                Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
