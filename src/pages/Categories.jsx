import React, { useEffect, useState } from "react";
import "./Categories.css";
import ProductFillter from "../components/layout/categories/ProductFillter";
import ProductDisplay from "../components/layout/product/ProductDisplay";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";

const Categories = () => {
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState(() => {
    return {
      topicId: Number(searchParams.get("categoryId")) || 0,
      designId: Number(searchParams.get("designId")) || 0,
      flowerTypeId: Number(searchParams.get("flowerTypeId")) || 0,
      hasDiscount: searchParams.get("hasDiscount") === "true",
      bestSeler: searchParams.get("bestSeler") === "true",
      page: 1,
      size: 16,
    };
  });
  useEffect(() => {
    // Luôn đồng bộ state parent với URL để chắc chắn request đúng
    const urlTopic = Number(searchParams.get("categoryId")) || 0;
    const urlDesign = Number(searchParams.get("designId")) || 0;
    const urlFlowerType = Number(searchParams.get("flowerTypeId")) || 0;
    const urlHasDiscount = searchParams.get("hasDiscount") === "true";
    const urlBestSeler = searchParams.get("bestSeler") === "true";

    setFilters(prev => {
      if (
        prev.topicId !== urlTopic ||
        prev.designId !== urlDesign ||
        prev.flowerTypeId !== urlFlowerType ||
        prev.hasDiscount !== urlHasDiscount ||
        prev.bestSeler !== urlBestSeler
      ) {
        return {
          ...prev,
          topicId: urlTopic,
          designId: urlDesign,
          flowerTypeId: urlFlowerType,
          hasDiscount: urlHasDiscount,
          bestSeler: urlBestSeler,
          page: 1, // Reset trang khi đổi filter
        };
      }
      return prev;
    });
  }, [searchParams]);

  const handleFilterChange = React.useCallback((newFilter) => {
    setFilters(prev => ({
      ...prev,
      ...newFilter,
      page: 1,
    }));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/api/product/getProducts", filters);
        setProducts(res.data.content);
        setTotalPage(res.data.totalPages);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } catch (err) {
        console.error("Error:", err);
      }
    };
    fetchData();
  }, [filters]);

  return (
    <div className="container content">
      <div className="content-main-vertical">
        <ProductFillter onFilterChange={handleFilterChange} />
        <ProductDisplay products={products} />
        <ReactPaginate
          pageCount={totalPage}
          forcePage={filters.page - 1}
          onPageChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              page: e.selected + 1,
            }))
          }
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
