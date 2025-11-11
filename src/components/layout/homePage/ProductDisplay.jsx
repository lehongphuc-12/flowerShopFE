import React from "react";
import "./ProductDisplay.css";
import { flowers } from "../../../data/ProductsData";
import ProductCard from "../../products/ProductCard";
const ProductDisplay = ({ title }) => {
  return (
    <div className="productDisplay">
      <h4>{title}</h4>
      <div className="row">
        {flowers.slice(0, 8).map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductDisplay;
