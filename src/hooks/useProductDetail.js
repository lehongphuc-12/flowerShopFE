import { useState, useEffect, useCallback } from "react";
import productService from "../api/productService";

const useProductDetail = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = useCallback(async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    try {
      // Đảm bảo delay ít nhất 1s để đồng bộ trải nghiệm với trang Categories
      const [data] = await Promise.all([
        productService.getProductById(id),
        new Promise((resolve) => setTimeout(resolve, 1000)),
      ]);
      setProduct(data);
    } catch (err) {
      console.error("Error fetching product detail:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProduct();
  }, [fetchProduct]);

  return {
    product,
    loading,
    error,
    refetch: fetchProduct,
  };
};

export default useProductDetail;
