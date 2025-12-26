import { useState, useEffect, useCallback } from "react";
import productService from "../api/productService";

const useProducts = (initialFilters) => {
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Đảm bảo delay ít nhất 1.2s để tránh giật lag UI và show "No products" quá sớm
      const [data] = await Promise.all([
        productService.getProducts(filters),
        new Promise((resolve) => setTimeout(resolve, 1000)),
      ]);
      
      setProducts(data.content || []);
      setTotalPage(data.totalPages || 0);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1, // Reset to first page on filter change
    }));
  }, []);

  const changePage = useCallback((pageNumber) => {
    setFilters((prev) => ({
      ...prev,
      page: pageNumber,
    }));
  }, []);

  return {
    products,
    totalPage,
    loading,
    error,
    filters,
    updateFilters,
    changePage,
    refetch: fetchProducts,
  };
};

export default useProducts;
