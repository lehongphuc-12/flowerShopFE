import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Categories.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { topics, Design, flowerTypes } from "../../data/CategoriesData";

const Categories = () => {
  const [topics, setTopics] = useState(null);
  const [designs, setDesigns] = useState(null);
  const [flowerTypes, setFlowerTypes] = useState(null);

  useEffect(() => {
    axios.get("/api/categories/").then((res) => {
      setTopics(res.data.topics);
      setDesigns(res.data.designs);
      setFlowerTypes(res.data.flowerTypes);
    });
  }, []);
  const allCategories = [
    { id: 1, name: "Chủ đề", children: topics },
    { id: 2, name: "Thiết kế", children: designs },
    { id: 3, name: "HOA TƯƠI", children: flowerTypes },
    { id: 4, name: "Hoa Tươi Giảm Giá" },
    { id: 5, name: "Best seler" },
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
                  <Link
                    className="nav-link"
                    to={
                      category.id === 4
                        ? "/categories?hasDiscount=true"
                        : category.id === 5
                        ? "/categories?bestSeler=true"
                        : "/categories"
                    }
                  >
                    {category.name}
                  </Link>
                  {category.children && category.children.length > 0 && (
                    <ul className="dropdown-menu">
                      {category.children.map((child, idx) => (
                        <li key={child.id ?? `${category.id}-${idx}`}>
<Link
  className=""
  to={
    category.id === 1
      ? `/categories?categoryId=${encodeURIComponent(child.categoryId)}`
      : category.id === 2
      ? `/categories?designId=${encodeURIComponent(child.designId)}`
      : category.id === 3 
      ? `/categories?flowerTypeId=${encodeURIComponent(child.flowerTypeId)}`
      : category.id === 4
      ? `/categories?hasDiscount=true`
      : `/categories?bestSeler=true`
  }
>
  {category.id === 1
    ? child.categoryName
    : category.id === 2
    ? child.designName
    : child.typeName}
</Link>
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
