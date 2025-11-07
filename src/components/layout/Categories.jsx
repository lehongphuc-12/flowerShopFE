import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Categories.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";
const Categories = () => {
  return (
    <div className="container">
      <nav class="navbar navbar-expand-lg ">
        <div
          class="container-fluid"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#narbar-menu"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div class="collapse navbar-collapse categories">
            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle">Hoa sinh nhật</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle">Hoa Khai Trương</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle">Chủ Đề</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle">Thiết kế</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle">HOA TƯƠI</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle">Hoa Tươi Giảm Giá</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle">Best seler</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Categories;
