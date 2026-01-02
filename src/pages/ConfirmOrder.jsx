import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";
import Toast from "../components/common/Toast";
import "./ConfirmOrder.css";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, totalValue, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Get order data from navigation state
  const orderData = location.state?.orderData;

  useEffect(() => {
    // Redirect if no order data
    if (!orderData) {
      navigate("/order");
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return null;
  }

  const {
    formData,
    paymentMethod,
    deliveryMethod,
    recipientType,
    selectedCartItems,
    selectedTotal,
    selectedItems,
    itemQuantities,
  } = orderData;

  // Use selectedCartItems if available, otherwise fall back to cart
  const itemsToDisplay = selectedCartItems || cart;
  const displayTotal = selectedTotal !== undefined ? selectedTotal : totalValue;

  const handleConfirmOrder = async () => {
    setLoading(true);

    try {
      const response = await axios.post("/api/orders", {
        items: selectedCartItems || cart,
        shippingInfo: formData,
        total: selectedTotal !== undefined ? selectedTotal : totalValue,
        paymentMethod,
        deliveryMethod,
        recipientType,
      });

      setToast({ type: "success", message: "Đặt hàng thành công!" });

      // Clear cart and redirect after success
      setTimeout(() => {
        clearCart();
        navigate("/order-success");
      }, 1500);
    } catch (error) {
      console.error("Order error:", error);
      setToast({
        type: "error",
        message:
          error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại.",
      });
      setLoading(false);
    }
  };

  const handleEditOrder = () => {
    navigate("/order", {
      state: {
        formData,
        paymentMethod,
        deliveryMethod,
        recipientType,
        selectedItems,
        itemQuantities,
      },
    });
  };

  return (
    <div className="confirm-order-container">
      <h1 className="confirm-title">Xác nhận đơn hàng</h1>

      <div className="confirm-content">
        {/* Order Information Section */}
        <div className="confirm-section">
          <div className="section-header">
            <h2>Thông tin đơn hàng</h2>
            {/* <button className="edit-btn" onClick={handleEditOrder}>
              Chỉnh sửa
            </button> */}
          </div>

          {/* Recipient Type */}
          <div className="info-group">
            <label>Loại đơn hàng:</label>
            <p>
              {recipientType === "self" ? "Cho chính mình" : "Cho người khác"}
            </p>
          </div>

          {/* Sender Name (if gift) */}
          {recipientType === "other" && formData.senderName && (
            <div className="info-group">
              <label>Người gửi:</label>
              <p>{formData.senderName}</p>
            </div>
          )}

          {/* Recipient Info */}
          <div className="info-group">
            <label>Người nhận:</label>
            <p>{formData.fullName}</p>
          </div>

          <div className="info-group">
            <label>Số điện thoại:</label>
            <p>{formData.phone}</p>
          </div>

          {formData.email && (
            <div className="info-group">
              <label>Email:</label>
              <p>{formData.email}</p>
            </div>
          )}

          {/* Delivery Method */}
          <div className="info-group">
            <label>Phương thức nhận hàng:</label>
            <p>
              {deliveryMethod === "shipping"
                ? "Giao hàng tận nơi"
                : "Nhận tại cửa hàng"}
            </p>
          </div>

          {/* Address */}
          <div className="info-group">
            <label>Địa chỉ:</label>
            <p>{formData.address}</p>
          </div>

          {/* Delivery Date & Time */}
          <div className="info-group">
            <label>
              Thời gian {deliveryMethod === "pickup" ? "nhận" : "giao"} hàng:
            </label>
            <p>
              {new Date(formData.deliveryDate).toLocaleDateString("vi-VN")} -{" "}
              {formData.deliveryTime}
            </p>
          </div>

          {/* Note */}
          {formData.note && (
            <div className="info-group">
              <label>Ghi chú:</label>
              <p>{formData.note}</p>
            </div>
          )}

          {/* Payment Method */}
          <div className="info-group">
            <label>Phương thức thanh toán:</label>
            <p>
              {paymentMethod === "cod"
                ? "Thanh toán khi nhận hàng (COD)"
                : "Chuyển khoản ngân hàng"}
            </p>
          </div>

          {paymentMethod === "banking" && (
            <div className="banking-info-box">
              <p>
                <strong>Thông tin chuyển khoản:</strong>
              </p>
              <p>Ngân hàng: MB Bank</p>
              <p>Số tài khoản: 123456789</p>
              <p>Chủ tài khoản: FLOWER SHOP</p>
              <p>
                Nội dung: {formData.phone} - {formData.fullName}
              </p>
            </div>
          )}
        </div>

        {/* Order Summary Section */}
        <div className="confirm-section">
          <h2>Chi tiết đơn hàng</h2>

          <div className="order-items-list">
            {itemsToDisplay.map((item) => {
              const itemId = item.id || item.flowerId;
              return (
                <div key={itemId} className="confirm-order-item">
                  <img src={item.imageUrl} alt={item.flowerName} />
                  <div className="item-details">
                    <h4>{item.flowerName}</h4>
                    <p>Số lượng: {item.quantity}</p>
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
              <span>Tạm tính:</span>
              <span>{displayTotal.toLocaleString()}₫</span>
            </div>
            <div className="total-row">
              <span>Phí vận chuyển:</span>
              <span>Miễn phí</span>
            </div>
            <div className="total-row final">
              <span>Tổng cộng:</span>
              <span className="total-price">
                {displayTotal.toLocaleString()}₫
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="confirm-actions">
        <button
          className="back-btn"
          onClick={handleEditOrder}
          disabled={loading}
        >
          Quay lại chỉnh sửa
        </button>
        <button
          className="confirm-btn"
          onClick={handleConfirmOrder}
          disabled={loading}
        >
          {loading ? "Đang xử lý..." : "Xác nhận đặt hàng"}
        </button>
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

export default ConfirmOrder;
