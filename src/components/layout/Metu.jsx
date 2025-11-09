import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Metu.css";
import { faPhoneVolume, faHome } from "@fortawesome/free-solid-svg-icons";
import { Zalo } from "../../assets/icons/icons";
import { Link } from "react-router-dom";

const Metu = () => {
  return (
    <div id="metu">
      <div className="container">
        <div>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} />
            <span>Trang chủ</span>
          </Link>
        </div>
        <div className="metu-mid">
          <a
            href="https://zalo.me/0788580223"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Zalo className="icon-zalo" />
            <span>Nhắn tin Zalo</span>
          </a>
        </div>
        <div>
          <a href="tel:0788580223">
            <FontAwesomeIcon icon={faPhoneVolume} />
            <span>0788580223</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Metu;
