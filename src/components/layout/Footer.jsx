import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Footer.css";
import {
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="container">
        <div className="footer-content">
          <div className="introduction">
            <img
              src="https://www.flowercorner.vn/image/catalog/common/shop-hoa-tuoi-flowercorner-logo.png.webp"
              alt=""
            />
            <div className="content">
              <p>Hotline: 0788580223</p>
              <p>Email: phucle682004@gmail.com</p>
            </div>
          </div>
          <div className="takecare">
            <p>
              <b>Chăm sóc khách hàng</b>
            </p>
            <div className="content">
              <p>
                <a> Giới Thiệu</a>{" "}
              </p>
              <p>
                <a> Liên Hệ</a>{" "}
              </p>
              <p>
                <a> Chính Sách Vận Chuyển</a>{" "}
              </p>
              <p>
                <a> Câu Hỏi Thường Gặp</a>{" "}
              </p>
              <p>
                <a> Hình Thức Thanh Toán</a>{" "}
              </p>
              <p>
                <a> Bảo Mật Thông Tin</a>{" "}
              </p>
              <p>
                <a> Chính Sách Hoàn Tiền</a>{" "}
              </p>
              <p>
                <a> Xử Lý Khiếu Nại</a>{" "}
              </p>
              <p>
                <a> Tại Sao Nên Chọn FlowerCorner.vn</a>{" "}
              </p>
              <p>
                <a> Blog</a>{" "}
              </p>
            </div>
          </div>
          <div className="socialFollow">
            <p>
              <b>THEO DÕI</b>
            </p>
            <ul className="content">
              <li>
                <p>
                  <a href="">
                    <FontAwesomeIcon
                      icon={faFacebook}
                      style={{ color: "blue" }}
                    />
                    Facebook
                  </a>
                </p>
              </li>
              <li>
                <p>
                  <a href="">
                    <FontAwesomeIcon
                      icon={faTiktok}
                      style={{ color: "black" }}
                    />
                    Tiktok
                  </a>
                </p>
              </li>
              <li>
                <p>
                  <a href="">
                    <FontAwesomeIcon
                      icon={faInstagram}
                      style={{ color: "#d56387" }}
                    />
                    Instagram
                  </a>
                </p>
              </li>
            </ul>
          </div>
          <div className="address">
            <p>
              <b>SHOP HOA FLOWERCORNER</b>
            </p>
            <div className="content">
              <p>Địa chỉ: Lê Quảng Chí, Hòa Xuân, Cẩm Lệ, Đà Nẵng</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
