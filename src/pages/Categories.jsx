import React, { useEffect } from "react";
import "./Categories.css";
import ProductFillter from "../components/layout/categories/ProductFillter";
import ProductDisplay from "../components/layout/product/ProductDisplay";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
import useProducts from "../hooks/useProducts";

const Categories = () => {
  const [searchParams] = useSearchParams();

  const initialFilters = {
    topicId: Number(searchParams.get("categoryId")) || 0,
    designId: Number(searchParams.get("designId")) || 0,
    flowerTypeId: Number(searchParams.get("flowerTypeId")) || 0,
    hasDiscount: searchParams.get("hasDiscount") === "true",
    bestSeler: searchParams.get("bestSeler") === "true",
    page: 1,
    size: 16,
  };

  const { products, totalPage, filters, updateFilters, changePage } = useProducts(initialFilters);

  useEffect(() => {
    // Luôn đồng bộ state hooks với URL khi URL thay đổi từ nguồn khác (ví dụ: click Navbar link)
    const urlFilters = {
      topicId: Number(searchParams.get("categoryId")) || 0,
      designId: Number(searchParams.get("designId")) || 0,
      flowerTypeId: Number(searchParams.get("flowerTypeId")) || 0,
      hasDiscount: searchParams.get("hasDiscount") === "true",
      bestSeler: searchParams.get("bestSeler") === "true",
    };
    
    // Chỉ update nếu có sự khác biệt để tránh loop
    if (
      filters.topicId !== urlFilters.topicId ||
      filters.designId !== urlFilters.designId ||
      filters.flowerTypeId !== urlFilters.flowerTypeId ||
      filters.hasDiscount !== urlFilters.hasDiscount ||
      filters.bestSeler !== urlFilters.bestSeler
    ) {
      updateFilters(urlFilters);
    }
  }, [searchParams, filters, updateFilters]);

  const handleFilterChange = React.useCallback((newFilter) => {
    updateFilters(newFilter);
  }, [updateFilters]);

  const handlePageChange = (e) => {
    changePage(e.selected + 1);
  };

  return (
    <div className="container content">
      <div className="content-main-vertical">
        <ProductFillter onFilterChange={handleFilterChange} />
        <ProductDisplay products={products} />
        <ReactPaginate
          pageCount={totalPage}
          forcePage={filters.page - 1}
          onPageChange={handlePageChange}
          previousLabel="Prev"
          nextLabel="Next"
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default Categories;
