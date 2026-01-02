import React, { useState, useEffect } from "react";

import { useCart } from "../context/CartContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./Order.css";
// import axios from "axios"; // Uncomment when integrating with API
import Toast from "../components/common/Toast";
import { useAuth } from "../hooks/useAuth";
import authService from "../api/authService";
import axios from "axios";

// Maximum total quantity allowed per order
const MAX_ORDER_QUANTITY = 15;

const Order = () => {
  const { user } = useAuth();
  const { cart, totalValue } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if returning from confirmation page with saved data
  const savedOrderData = location.state;

  const [recipientType, setRecipientType] = useState(
    savedOrderData?.recipientType || "self"
  );
  const [deliveryMethod, setDeliveryMethod] = useState(
    savedOrderData?.deliveryMethod || "shipping"
  );
  const [formData, setFormData] = useState(
    savedOrderData?.formData || {
      fullName: "",
      phone: "",
      address: "",
      email: "",
      note: "",
      senderName: "",
      deliveryDate: "",
      deliveryTime: "",
    }
  );

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(
    savedOrderData?.paymentMethod || "cod"
  );

  // State for selected items and their quantities
  const [selectedItems, setSelectedItems] = useState(() => {
    // Restore from saved data if available
    if (savedOrderData?.selectedItems) {
      return savedOrderData.selectedItems;
    }
    // Otherwise initialize with all items selected
    const selected = {};
    cart.forEach((item) => {
      const itemId = item.id || item.flowerId;
      selected[itemId] = true;
    });
    return selected;
  });

  const [itemQuantities, setItemQuantities] = useState(() => {
    // Restore from saved data if available
    if (savedOrderData?.itemQuantities) {
      return savedOrderData.itemQuantities;
    }
    // Otherwise initialize with cart quantities
    const quantities = {};
    cart.forEach((item) => {
      const itemId = item.id || item.flowerId;
      quantities[itemId] = item.quantity;
    });
    return quantities;
  });

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
    // Only fetch if not returning from confirmation page
    if (user && recipientType === "self" && !savedOrderData) {
      fetchProfileData();
    }
  }, [user, recipientType]);

  // Scroll to top when component mounts or when returning from confirmation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Handle checkbox toggle
  const handleItemToggle = (itemId) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  // Handle quantity increase
  const handleIncreaseQuantity = (itemId) => {
    // Calculate current total quantity
    const currentTotal = Object.entries(itemQuantities).reduce(
      (total, [id, qty]) => {
        if (selectedItems[id]) {
          return total + qty;
        }
        return total;
      },
      0
    );

    // Check if increasing would exceed limit
    if (currentTotal >= MAX_ORDER_QUANTITY) {
      setToast({
        type: "error",
        message: `Tổng số lượng không được vượt quá ${MAX_ORDER_QUANTITY} sản phẩm. Vui lòng liên hệ trực tiếp cửa hàng qua SĐT 0788580223 để đặt số lượng lớn hơn.`,
      });
      return;
    }

    setItemQuantities((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 1) + 1,
    }));
  };

  // Handle quantity decrease
  const handleDecreaseQuantity = (itemId) => {
    setItemQuantities((prev) => {
      const currentQty = prev[itemId] || 1;
      if (currentQty > 1) {
        return {
          ...prev,
          [itemId]: currentQty - 1,
        };
      }
      return prev;
    });
  };

  // Calculate total for selected items
  const calculateSelectedTotal = () => {
    return cart.reduce((total, item) => {
      const itemId = item.id || item.flowerId;
      if (selectedItems[itemId]) {
        const quantity = itemQuantities[itemId] || item.quantity;
        return total + item.price * quantity;
      }
      return total;
    }, 0);
  };

  const selectedTotal = calculateSelectedTotal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      setToast({
        type: "error",
        message: "Vui lòng điền đầy đủ thông tin giao hàng!",
      });
      return;
    }

    if (!formData.deliveryDate || !formData.deliveryTime) {
      setToast({
        type: "error",
        message: "Vui lòng chọn ngày và giờ nhận hàng!",
      });
      return;
    }

    // Validate delivery time is at least 2 hours from now
    const selectedDateTime = new Date(
      `${formData.deliveryDate}T${formData.deliveryTime}`
    );
    const currentDateTime = new Date();
    const twoHoursFromNow = new Date(
      currentDateTime.getTime() + 2 * 60 * 60 * 1000
    );

    if (selectedDateTime < twoHoursFromNow) {
      setToast({
        type: "error",
        message:
          "Thời gian giao hàng phải ít nhất 2 tiếng kể từ bây giờ! Nếu cần bạn có thể liên hệ trực tiếp đến cửa hàng qua SĐT 0788580223",
      });
      return;
    }

    // Check if any items are selected
    const hasSelectedItems = Object.values(selectedItems).some(
      (selected) => selected
    );
    if (!hasSelectedItems) {
      setToast({
        type: "error",
        message: "Vui lòng chọn ít nhất một sản phẩm!",
      });
      return;
    }

    // Filter selected items with updated quantities
    const selectedCartItems = cart
      .filter((item) => {
        const itemId = item.id || item.flowerId;
        return selectedItems[itemId];
      })
      .map((item) => {
        const itemId = item.id || item.flowerId;
        return {
          ...item,
          quantity: itemQuantities[itemId] || item.quantity,
        };
      });

    // Calculate total quantity of selected items
    const totalQuantity = selectedCartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    // Check if total quantity exceeds limit
    if (totalQuantity > MAX_ORDER_QUANTITY) {
      setToast({
        type: "error",
        message: `Tổng số lượng không được vượt quá ${MAX_ORDER_QUANTITY} sản phẩm. Vui lòng liên hệ trực tiếp cửa hàng qua SĐT 0788580223 để đặt số lượng lớn hơn.`,
      });
      return;
    }

    // Navigate to confirmation page with selected items
    navigate("/confirm-order", {
      state: {
        orderData: {
          formData,
          paymentMethod,
          deliveryMethod,
          recipientType,
          selectedCartItems,
          selectedTotal,
          selectedItems,
          itemQuantities,
        },
      },
    });
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
      <h1 className="order-title">Tạo đơn hàng</h1>

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
              <label>
                Ngày {deliveryMethod === "pickup" ? "nhận" : "giao"} hàng
              </label>
              <input
                type="date"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <div className="form-group">
              <label>
                Giờ {deliveryMethod === "pickup" ? "nhận" : "giao"} hàng
              </label>
              <input
                type="time"
                name="deliveryTime"
                value={formData.deliveryTime}
                onChange={handleChange}
                required
              />
            </div>

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
            {/* <Link to="/cart" className="edit-cart-link">
              Chỉnh sửa đơn hàng
            </Link> */}
          </div>
          <div className="order-items">
            {cart.map((item) => {
              const itemId = item.id || item.flowerId;
              const quantity = itemQuantities[itemId] || item.quantity;
              const isSelected = selectedItems[itemId];

              return (
                <div
                  key={itemId}
                  className={`order-item ${!isSelected ? "unselected" : ""}`}
                >
                  <input
                    type="checkbox"
                    className="item-checkbox"
                    checked={isSelected || false}
                    onChange={() => handleItemToggle(itemId)}
                  />
                  <div className="item-info">
                    <img src={item.imageUrl} alt={item.flowerName} />
                    <div className="item-details">
                      <h4>{item.flowerName}</h4>
                      <div className="quantity-controls">
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => handleDecreaseQuantity(itemId)}
                          disabled={!isSelected || quantity <= 1}
                        >
                          −
                        </button>
                        <span className="quantity-display">{quantity}</span>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => handleIncreaseQuantity(itemId)}
                          disabled={!isSelected}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="item-price">
                    {(item.price * quantity).toLocaleString()}₫
                  </div>
                </div>
              );
            })}
          </div>

          <div className="order-totals">
            <div className="total-row">
              <span>Tạm tính</span>
              <span>{selectedTotal.toLocaleString()}₫</span>
            </div>
            <div className="total-row">
              <span>Phí vận chuyển</span>
              <span>Miễn phí</span>
            </div>
            <div className="total-row final">
              <span>Tổng cộng</span>
              <span className="total-price">
                {selectedTotal.toLocaleString()}₫
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
