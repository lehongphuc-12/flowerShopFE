import React from "react";
import "./ProductDisplay.css";
import { flowers } from "../../../data/ProductsData";
import ProductCard from "../../products/ProductCard";
const ProductDisplay = ({ title, quantity, products, useFlex = false }) => {
  const dataToShow = products && products.length > 0 ? products.slice(0, quantity) : flowers.slice(0, quantity);
  return (
    <div className="productDisplay">
      <h4>{title}</h4>
      <div className={`row${useFlex ? " flex-row" : ""}`}>
        {quantity >= 0 &&
          dataToShow.map((item) => <ProductCard key={item.id} product={item} />)}
      </div>
    </div>
  );
};

export default ProductDisplay;
