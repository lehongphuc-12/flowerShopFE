import React from "react";
import Slider from "../components/layout/homePage/Slider.jsx";
import ProductDisplay from "../components/layout/homePage/ProductDisplay.jsx";
const Home = () => {
  return (
    <div className="main">
      <div className="container">
        <Slider />
        <ProductDisplay title={"Đang giảm giá"} />
        <ProductDisplay title={"Best seller"} />
        <ProductDisplay title={"Sản phẩm mới"} />
      </div>
    </div>
  );
};

export default Home;
