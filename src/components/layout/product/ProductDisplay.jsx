import React from "react";
import "./ProductDisplay.css";
import { flowers } from "../../../data/ProductsData";
import ProductCard from "../../products/ProductCard";
const ProductDisplay = ({ title, quantity }) => {
  return (
    <div className="productDisplay">
      <h4>{title}</h4>
      <div className="row">
        {quantity >= 0 &&
          flowers
            .slice(0, quantity)
            .map((item) => <ProductCard key={item.id} product={item} />)}
      </div>
    </div>
  );
};

export default ProductDisplay;
