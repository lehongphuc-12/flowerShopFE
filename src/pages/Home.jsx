import React from "react";
import Slider from "../components/layout/homePage/Slider.jsx";
import ProductDisplay from "../components/layout/product/ProductDisplay.jsx";
import Categories from "../components/layout/Categories.jsx";
const Home = () => {
  return (
    <div className="main">
      <div className="container">
        <Categories />
        <div
          className="hotline"
          style={{
            padding: "6px",
            textAlign: "center",
            color: "#ff3b3d",
            textTransform: "uppercase",
            fontWeight: "600",
          }}
        >
          Hotline: 0788580223
        </div>
        <Slider />
        <ProductDisplay title={"Đang giảm giá"} quantity={8} />
        <ProductDisplay title={"Best seller"} quantity={8} />
        <ProductDisplay title={"Sản phẩm mới"} quantity={8} />
      </div>
    </div>
  );
};

export default Home;
