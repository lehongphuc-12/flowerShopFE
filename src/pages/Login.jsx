import React, { useState } from "react";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Toast from "../components/common/Toast";
import { useAuth } from "../hooks/useAuth";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const { login, loginWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      // Gọi API login qua context
      const data = await login(formData);

      if (data.state) {
        setMessage("Đăng nhập thành công");
        setToastType("success");
        // Chờ 1 chút để toast hiện lên rồi chuyển trang
        await new Promise((resolve) => setTimeout(resolve, 800));
        navigate(from, { replace: true });
      } else {
        setToastType("error");
        setMessage(data.message || "Đăng nhập thất bại. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage(error.message || "Có lỗi xảy ra. Vui lòng thử lại!");
      setToastType("error");
    }
    setLoading(false);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setMessage("");
    try {
      const result = await loginWithGoogle(credentialResponse.credential);
      if (result.state) {
        setMessage("Đăng nhập bằng Google thành công");
        setToastType("success");
        await new Promise((resolve) => setTimeout(resolve, 800));
        navigate(from, { replace: true });
      } else {
        setToastType("error");
        setMessage(result.message || "Đăng nhập bằng Google thất bại");
      }
    } catch (error) {
      console.error("Google login error:", error);
      setMessage("Có lỗi xảy ra khi đăng nhập bằng Google");
      setToastType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setMessage("Đăng nhập bằng Google thất bại");
    setToastType("error");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-container">
          <div className="login-card">
            <h2 className="login-title">Đăng nhập</h2>
            <p className="login-subtitle">Chào mừng bạn trở lại!</p>
            <div className="social-login">
              <div className="social-button-wrapper">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap
                  theme="outline"
                  size="large"
                  text="signin_with"
                  shape="rectangular"
                />
              </div>
            </div>
            <div className="login-divider">
              <span>Hoặc</span>
            </div>
            <form onSubmit={handleSubmit} className="login-form">
              {/* {message && (
                <div className="login-message" style={{ color: 'red', marginBottom: 8 }}>
                  {message}
                </div>
              )} */}
              <div className="form-group">
                <label htmlFor="email">Email hoặc tên đăng nhập</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Nhập email hoặc tên đăng nhập"
                  required
                />
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
                    placeholder="Nhập mật khẩu"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Ghi nhớ đăng nhập</span>
                </label>
                <a href="/forgot-password" className="forgot-password">
                  Quên mật khẩu?
                </a>
              </div>

              <button type="submit" className="login-button" disabled={loading}>
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
              {message && <Toast message={message} type={toastType} />}
            </form>

            <div className="signup-link">
              <p>
                Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
