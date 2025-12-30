import React from "react";
import "./ProductDisplay.css";
import ProductCard from "../../products/ProductCard";
import NotFound from "../../common/NotFound";

const ProductDisplay = ({ title, products = [], useFlex = false, quantity }) => {
  let dataToShow = products;

  if (quantity && dataToShow.length > quantity) {
    dataToShow = dataToShow.slice(0, quantity);
  }

  return (
    <div className="productDisplay">
      {title && <h4>{title}</h4>}
      {dataToShow.length > 0 ? (
        <div className={`row${useFlex ? " flex-row" : ""}`}>
          {dataToShow.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      ) : (
        <NotFound
          message="Hiện tại không có sản phẩm nào trong danh mục này."
          showBackButton={false}
        />
      )}
    </div>
  );
};

export default ProductDisplay;
