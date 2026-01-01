import React, { useState, useEffect } from "react";

import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import "./Order.css";
// import axios from "axios"; // Uncomment when integrating with API
import Toast from "../components/common/Toast";
import { useAuth } from "../hooks/useAuth";
import authService from "../api/authService";

const Order = () => {
  const { user } = useAuth();
  const { cart, totalValue } = useCart();
  const navigate = useNavigate();
  const [recipientType, setRecipientType] = useState("self"); // "self" | "other"
  const [deliveryMethod, setDeliveryMethod] = useState("shipping"); // "shipping" | "pickup"
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    email: "",
    note: "",
    senderName: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Fetch profile logic
  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const profileData = await authService.getProfile();
      if (profileData) {
        setFormData((prev) => ({
          ...prev,
          fullName: profileData.fullName || user?.fullName || "",
          phone: profileData.phone || user?.phone || "",
          address: profileData.address || user?.address || "",
          email: profileData.email || user?.email || "",
          senderName: "",
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          fullName: user?.fullName || "",
          phone: user?.phone || "",
          address: user?.address || "",
          email: user?.email || "",
        }));
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setFormData((prev) => ({
        ...prev,
        fullName: user?.fullName || "",
        phone: user?.phone || "",
        address: user?.address || "",
        email: user?.email || "",
      }));
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and update when user/recipientType changes
  useEffect(() => {
    if (user && recipientType === "self") {
      fetchProfileData();
    }
  }, [user, recipientType]);

  const handleRecipientChange = (e) => {
    const type = e.target.value;
    setRecipientType(type);

    if (type === "self") {
      // Effect will handle fetch
    } else if (type === "other") {
      setFormData((prev) => ({
        ...prev,
        fullName: "",
        phone: "",
        address: "",
        senderName: user?.fullName || "", // Pre-fill sender name
      }));
      setPaymentMethod("banking");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [paymentMethod, setPaymentMethod] = useState("cod"); // "cod" | "banking"

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      setToast({
        type: "error",
        message: "Vui lòng điền đầy đủ thông tin giao hàng!",
      });
      return;
    }

    if (cart.length === 0) {
      setToast({ type: "error", message: "Giỏ hàng của bạn đang trống!" });
      return;
    }

    setLoading(true);

    // Mock API call for now
    try {
      // TODO: Replace with actual API call
      // const response = await axios.post("/api/orders", {
      //     items: cart,
      //     shippingInfo: formData,
      //     total: totalValue
      // });

      // Simulating delay
      setTimeout(() => {
        setToast({ type: "success", message: "Đặt hàng thành công!" });
        setLoading(false);
        // navigate("/order-success"); // Or redirect to history
      }, 1500);
    } catch (error) {
      setToast({ type: "error", message: "Có lỗi xảy ra, vui lòng thử lại." });
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="order-container" style={{ textAlign: "center" }}>
        <h2>Giỏ hàng của bạn đang trống</h2>
        <button
          className="place-order-btn"
          onClick={() => navigate("/categories")}
          style={{ maxWidth: "200px" }}
        >
          Mua sắm ngay
        </button>
      </div>
    );
  }

  return (
    <div className="order-container">
      <h1 className="order-title">Thanh toán</h1>

      <div className="order-content">
        {/* Left Column: Shipping Info */}
        <div className="order-form-section">
          <h2 className="section-title">Thông tin giao hàng</h2>

          <div className="recipient-selection">
            <label
              className={`recipient-option ${
                recipientType === "self" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                value="self"
                checked={recipientType === "self"}
                onChange={handleRecipientChange}
              />
              Cho chính mình
            </label>
            <label
              className={`recipient-option ${
                recipientType === "other" ? "active" : ""
              }`}
            >
              <input
                type="radio"
                value="other"
                checked={recipientType === "other"}
                onChange={handleRecipientChange}
              />
              Cho người khác
            </label>
          </div>

          <form onSubmit={handleSubmit}>
            {recipientType === "other" && (
              <div className="form-group">
                <label>Tên người gửi</label>
                <input
                  type="text"
                  name="senderName"
                  value={formData.senderName}
                  onChange={handleChange}
                  placeholder="Nhập tên người gửi"
                />
              </div>
            )}
            <div className="form-group">
              <label>
                Họ và tên {recipientType === "other" ? "người nhận" : ""}
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Nhập họ tên người nhận"
                required
              />
            </div>

            <div className="form-group">
              <label>Số điện thoại</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email xác nhận đơn hàng"
              />
            </div>

            <div className="form-group">
              <label>Phương thức nhận hàng</label>
              <div className="delivery-options">
                <label
                  className={`radio-label ${
                    deliveryMethod === "shipping" ? "checked" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="shipping"
                    checked={deliveryMethod === "shipping"}
                    onChange={(e) => {
                      setDeliveryMethod(e.target.value);
                      // Reset address to user's address if available or empty
                      setFormData((prev) => ({
                        ...prev,
                        address:
                          recipientType === "self" && user?.address
                            ? user.address
                            : "",
                      }));
                    }}
                  />
                  Giao hàng tận nơi
                </label>
                <label
                  className={`radio-label ${
                    deliveryMethod === "pickup" ? "checked" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="pickup"
                    checked={deliveryMethod === "pickup"}
                    onChange={(e) => {
                      setDeliveryMethod(e.target.value);
                      setFormData((prev) => ({
                        ...prev,
                        address: "Nhận tại cửa hàng",
                      }));
                    }}
                  />
                  Nhận tại cửa hàng
                </label>
              </div>
            </div>

            {deliveryMethod === "shipping" && (
              <div className="form-group">
                <label>Địa chỉ giao hàng</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ giao hàng cụ thể"
                  required
                />
              </div>
            )}

            {deliveryMethod === "pickup" && (
              <div className="form-group">
                <label>Địa chỉ cửa hàng</label>
                <div className="store-address-box">
                  <p>
                    <strong>Flower Shop</strong>
                  </p>
                  <p>123 Đường Hoa Lan, Quận Phú Nhuận, TP.HCM</p>
                  <p>Giờ mở cửa: 8:00 - 22:00 (Hàng ngày)</p>
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Ghi chú đơn hàng (Tùy chọn)</label>
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder="Ví dụ: Giao hàng giờ hành chính, gọi trước khi giao..."
              ></textarea>
            </div>
          </form>

          <div className="payment-method-section">
            <h2 className="section-title">Phương thức thanh toán</h2>
            <div className="payment-options">
              <label
                className={`payment-option ${
                  paymentMethod === "cod" ? "selected" : ""
                } ${recipientType === "other" ? "disabled" : ""}`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={handlePaymentChange}
                  disabled={recipientType === "other"}
                />
                <span className="radio-custom"></span>
                <div className="payment-details">
                  <span className="payment-name">
                    Thanh toán khi nhận hàng (COD)
                  </span>
                  <span className="payment-desc">
                    {recipientType === "other"
                      ? "Không hỗ trợ cho đơn hàng quà tặng"
                      : "Thanh toán bằng tiền mặt khi nhận được hàng"}
                  </span>
                </div>
              </label>

              <label
                className={`payment-option ${
                  paymentMethod === "banking" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="banking"
                  checked={paymentMethod === "banking"}
                  onChange={handlePaymentChange}
                />
                <span className="radio-custom"></span>
                <div className="payment-details">
                  <span className="payment-name">Chuyển khoản ngân hàng</span>
                  <span className="payment-desc">
                    Quét mã QR hoặc chuyển khoản trực tiếp
                  </span>
                </div>
              </label>
            </div>

            {paymentMethod === "banking" && (
              <div className="banking-info">
                <p>Vui lòng chuyển khoản đến số tài khoản sau:</p>
                <div className="bank-account">
                  <strong>Ngân hàng:</strong> MB Bank
                  <br />
                  <strong>Số tài khoản:</strong> 123456789
                  <br />
                  <strong>Chủ tài khoản:</strong> FLOWER SHOP
                  <br />
                  <strong>Nội dung:</strong> [SĐT] - [Họ tên]
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="order-summary-section">
          <div className="summary-header">
            <h2 className="section-title">Đơn hàng của bạn</h2>
            <Link to="/cart" className="edit-cart-link">
              Chỉnh sửa đơn hàng
            </Link>
          </div>
          <div className="order-items">
            {cart.map((item) => {
              const itemId = item.id || item.flowerId;
              return (
                <div key={itemId} className="order-item">
                  <div className="item-info">
                    <img src={item.imageUrl} alt={item.flowerName} />
                    <div className="item-details">
                      <h4>{item.flowerName}</h4>
                      <p>x {item.quantity}</p>
                    </div>
                  </div>
                  <div className="item-price">
                    {(item.price * item.quantity).toLocaleString()}₫
                  </div>
                </div>
              );
            })}
          </div>

          <div className="order-totals">
            <div className="total-row">
              <span>Tạm tính</span>
              <span>{totalValue.toLocaleString()}₫</span>
            </div>
            <div className="total-row">
              <span>Phí vận chuyển</span>
              <span>Miễn phí</span>
            </div>
            <div className="total-row final">
              <span>Tổng cộng</span>
              <span className="total-price">
                {totalValue.toLocaleString()}₫
              </span>
            </div>
          </div>

          <button
            className="place-order-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            Đặt hàng
            {/* {loading ? "Đang xử lý..." : "Đặt hàng"} */}
          </button>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Order;
