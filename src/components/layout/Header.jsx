import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import {
  faBagShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="goSocialMedia row_left">
              <a href="">
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="social-icon"
                  style={{ color: "blue" }}
                />
              </a>
              <a href="">
                <FontAwesomeIcon
                  icon={faTiktok}
                  className="social-icon"
                  style={{ color: "#000000" }}
                />
              </a>
              <a href="">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="social-icon"
                  style={{ color: "#d56387" }}
                />
              </a>
            </div>
          </div>
          <div className="col-md-4 row_mid">
            <div className="logo">
              <img
                src="https://www.flowercorner.vn/image/catalog/common/shop-hoa-tuoi-flowercorner-logo.png.webp"
                alt=""
              />
            </div>
          </div>
          <div className="col-md-4 row_right row">
            <div className="col-sm-10 position-relative">
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button type="button">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="search-icon"
                  />
                </button>
              </form>
            </div>
            <div className="col-sm-2 cart-icon-wrapper dropdown">
              <div
                className="cart-icon-container dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
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
              </div>
              <ul
                className="dropdown-menu menu-cart"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <img
                            src="https://via.placeholder.com/36"
                            width="36"
                            alt="Example1"
                          />
                        </td>
                        <td className="product-name">Hoa Hồng Đỏ</td>
                        <td>2</td>
                        <td className="price">180,000₫</td>
                      </tr>
                      <tr>
                        <td>
                          <img
                            src="https://via.placeholder.com/36/ffc1e3/803655"
                            width="36"
                            alt="Example2"
                          />
                        </td>
                        <td className="product-name">Hoa Baby Xanh</td>
                        <td>1</td>
                        <td className="price">90,000₫</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="tong-tien">
                        <td colSpan="3">Tổng Tiền</td>
                        <td className="tong-tien-value">270,000₫</td>
                      </tr>
                    </tfoot>
                  </table>
                </li>

                <li className="button-group">
                  <button>
                    <a href="/Cart">Giỏ hàng</a>
                  </button>
                  <button>
                    <a href="">Thanh toán</a>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
