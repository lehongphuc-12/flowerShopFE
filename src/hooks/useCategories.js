import { useState, useEffect } from "react";
import categoryService from "../api/categoryService";

const useCategories = () => {
  const [topics, setTopics] = useState([]);
  const [designs, setDesigns] = useState([]);
  const [flowerTypes, setFlowerTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await categoryService.getCategories();
        setTopics(data.topics || []);
        setDesigns(data.designs || []);
        setFlowerTypes(data.flowerTypes || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return {
    topics,
    designs,
    flowerTypes,
    loading,
    error,
  };
};

export default useCategories;
