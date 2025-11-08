import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Metu.css";
import { faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { Zalo } from "../../assets/icons/icons";

const Metu = () => {
  return (
    <div id="metu">
      <div>
        <a href="">
          <FontAwesomeIcon icon={faPhoneVolume} />
          0788580223
        </a>
      </div>
      <div className="metu-mid">
        <a href="">
          <Zalo className="icon-zalo" />
          Nhắn tin Zalo
        </a>
      </div>
      <div>
        <a href="">
          <FontAwesomeIcon icon={faPhoneVolume} />
          0788580223
        </a>
      </div>
    </div>
  );
};

export default Metu;
