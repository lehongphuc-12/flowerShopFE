import React from "react";
import { useCart } from "../context/CartContext";
import "./Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
const Cart = () => {
  const { cart, updateQuantity, removeFromCart, totalValue: total } = useCart();

  const handleQtyChange = (e, id) => {
    const value = e.target.value;
    const newQty = value === "" ? "" : parseInt(value);
    if (newQty !== "" && !isNaN(newQty)) {
      updateQuantity(id, newQty);
    }
  };

  const handleUpdateClick = (id, currentQty) => {
    updateQuantity(id, currentQty);
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };
  return (
    <div className="container">
      <div className="content">
        <h4>Giỏ hàng</h4>
        <table>
          <thead>
            <tr>
              <td>Hình ảnh</td>
              <td>Sản phẩm</td>
              {/* <td>Mã sản phẩm</td> */}
              <td>Số Lượng</td>
              <td className="price-cell">Đơn Giá</td>
              <td className="total-cell">Tổng cộng</td>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => {
              const itemId = item.id || item.flowerId;
              return (
                <tr key={itemId}>
                  <td>
                    <img src={item.imageUrl} alt={item.flowerName} />
                  </td>
                  <td className="product-name-cell">{item.flowerName}</td>
                  {/* <td>{item.flowerId}</td> */}
                  <td>
                    <form action="">
                      <div className="input-group">
                        <input
                          type="text"
                          min="1"
                          max="100"
                          value={item.quantity}
                          onChange={(e) => handleQtyChange(e, itemId)}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateClick(itemId, item.quantity)
                          }
                        >
                          <FontAwesomeIcon icon={faRotate} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemove(itemId)}
                        >
                          <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                      </div>
                    </form>
                  </td>
                  <td className="price-cell">{item.price.toLocaleString()}₫</td>
                  <td className="total-cell">
                    {(
                      item.price * (Number(item.quantity) || 0)
                    ).toLocaleString()}
                    ₫
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4}>Tổng phụ</td>
              <td className="total-cell">{total.toLocaleString()}₫</td>
            </tr>
            <tr>
              <td colSpan={4}>Tổng</td>
              <td className="total-cell">{total.toLocaleString()}₫</td>
            </tr>
          </tfoot>
        </table>
        <div className="buttons">
          <button>
            <a href="/categories">Tiếp tục mua sắm</a>
          </button>
          <button>Thanh toán</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
