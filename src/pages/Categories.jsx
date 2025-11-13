import React, { useState } from "react";
import "./Categories.css";
import ProductFillter from "../components/layout/categories/ProductFillter";
import ProductDisplay from "../components/layout/product/ProductDisplay";
const Categories = () => {
  const [filters, setFilters] = useState({
    topics: [],
    design: [],
    flowerTypes: [],
    flowerColors: [],
    hasDiscount: false,
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="container content">
      <div className="content-main-vertical">
        <ProductFillter onFilterChange={handleFilterChange} />
        <ProductDisplay quantity={10} filters={filters} />
      </div>
    </div>
  );
};

export default Categories;
