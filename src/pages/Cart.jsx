import React, { useState } from "react";
import "./Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
const Cart = () => {
  const [qty, setQty] = useState("1");
  const [newQty, setNewQty] = useState(qty);
  const handleQtyChange = (e) => {
    setNewQty(e.target.value);
  };
  const handleQtyUpdate = () => {
    setQty(newQty);
  };

  const getValidQty = () => {
    const num = parseInt(qty, 10);
    return !isNaN(num) && num > 0 && num <= 100 ? num : 0;
  };

  const total = 120000 * getValidQty();

  return (
    <div className="container">
      <div className="content">
        <h4>Giỏ hàng</h4>
        <table>
          <thead>
            <tr>
              <td>Hình ảnh</td>
              <td>Sản phẩm</td>
              <td>Mã sản phẩm</td>
              <td>Số Lượng</td>
              <td className="price-cell">Đơn Giá</td>
              <td className="total-cell">Tổng cộng</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                  alt="Hoa Hồng Đỏ"
                />
              </td>
              <td className="product-name-cell">Hoa Hồng Đỏ</td>
              <td>ROSE01</td>
              <td>
                <form action="">
                  <div className="input-group">
                    <input
                      type="text"
                      min="1"
                      max="100"
                      value={newQty}
                      onChange={handleQtyChange}
                    />
                    <button type="button" onClick={handleQtyUpdate}>
                      <FontAwesomeIcon icon={faRotate} />
                    </button>
                    <button type="button">
                      <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                  </div>
                </form>
              </td>
              <td className="price-cell">120,000₫</td>
              <td className="total-cell">{total.toLocaleString()}₫</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5}>Tổng phụ</td>
              <td className="total-cell">{total.toLocaleString()}₫</td>
            </tr>
            <tr>
              <td colSpan={5}>Tổng</td>
              <td className="total-cell">{total.toLocaleString()}₫</td>
            </tr>
          </tfoot>
        </table>
        <div className="buttons">
          <button>Tiếp tục mua sắm</button>
          <button>Thanh toán</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
