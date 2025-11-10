import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Categories.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { topics, Design, flowerTypes } from "../../data/CategoriesData";

const Categories = () => {
  // Kết hợp tất cả các categories
  const allCategories = [
    { id: 1, name: "Chủ đề", children: topics },
    {
      id: 2,
      name: "Hoa sinh nhật",
      children: topics.find((item) => item.id === 1)?.children || [],
    },
    {
      id: 3,
      name: "Hoa chúc mừng",
      children: topics.find((item) => item.id === 2)?.children || [],
    },
    { id: 4, name: "Thiết kế", children: Design },
    { id: 5, name: "HOA TƯƠI", children: flowerTypes },
    { id: 6, name: "Hoa Tươi Giảm Giá" },
    { id: 7, name: "Best seler" },
  ];

  return (
    <div
      className="container"
      style={{
        position: "sticky",
        top: "0",
        zIndex: "1000",
        background: "#fff",
      }}
    >
      <nav className="navbar navbar-expand-lg " style={{ padding: "0px" }}>
        <div
          className="container-fluid"
          style={{
            display: "flex",
            justifyContent: "center",
            borderBottom: "1px solid #ddd",
          }}
        >
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#narbar-menu"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div className="collapse navbar-collapse categories">
            <ul className="navbar-nav">
              {allCategories.map((category) => (
                <li
                  key={category.id}
                  className={`nav-item dropdown ${
                    category.children ? "has-children" : ""
                  }`}
                >
                  <a className="nav-link">{category.name}</a>
                  {category.children && category.children.length > 0 && (
                    <ul className="dropdown-menu">
                      {category.children.map((child) => (
                        <li key={child.id}>
                          <a className="dropdown-item">{child.name}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Categories;
