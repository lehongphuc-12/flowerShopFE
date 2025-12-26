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
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Đồng bộ ngược từ URL vào Hook state khi URL thay đổi (ví dụ: bấm nút Back hoặc click Navbar)
    const urlFilters = {
      topicId: Number(searchParams.get("categoryId")) || 0,
      designId: Number(searchParams.get("designId")) || 0,
      flowerTypeId: Number(searchParams.get("flowerTypeId")) || 0,
      hasDiscount: searchParams.get("hasDiscount") === "true",
      bestSeler: searchParams.get("bestSeler") === "true",
    };
    
    updateFilters(urlFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleFilterChange = React.useCallback((newFilter) => {
    // Cập nhật URLSearchParams
    const newParams = new URLSearchParams();
    if (newFilter.topicId) newParams.set("categoryId", newFilter.topicId);
    if (newFilter.designId) newParams.set("designId", newFilter.designId);
    if (newFilter.flowerTypeId) newParams.set("flowerTypeId", newFilter.flowerTypeId);
    if (newFilter.hasDiscount) newParams.set("hasDiscount", "true");
    if (newFilter.bestSeler) newParams.set("bestSeler", "true");
    
    setSearchParams(newParams);
    // Hook useProducts sẽ tự fetch khi filters thay đổi (thông qua effect trên searchParams hoặc gọi trực tiếp)
    updateFilters(newFilter);
  }, [setSearchParams, updateFilters]);

  const handlePageChange = (e) => {
    const page = e.selected + 1;
    changePage(page);
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
