import React from "react";
import "./ProductDisplay.css";
import ProductCard from "../../products/ProductCard";
const ProductDisplay = ({ title, products = [], useFlex = false, quantity }) => {
  let dataToShow = products;

  if (quantity && dataToShow.length > quantity) {
    dataToShow = dataToShow.slice(0, quantity);
  }

  return (
    <div className="productDisplay">
      <h4>{title}</h4>
      <div className={`row${useFlex ? " flex-row" : ""}`}>
        {dataToShow.length > 0 ? (
          dataToShow.map((item) => <ProductCard key={item.id} product={item} />)
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default ProductDisplay;
