import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./ProductFillter.css";
import axios from "axios";
// import { topics, Design, flowerTypes, flowerColors } from "../../../data/CategoriesData";

const ProductFillter = ({ onFilterChange }) => {
  const [topics, setTopics] = useState([]);
  const [designs, setDesigns] = useState([]);
  const [flowerTypes, setFlowerTypes] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    axios.get("/api/categories/").then((res) => {
      setTopics(res.data.topics);
      setDesigns(res.data.designs);
      setFlowerTypes(res.data.flowerTypes);
    });
  }, []);

  const [filter, setFilter] = useState(() => {
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
    // Ưu tiên params trên URL nếu có, chỉ setFilter nếu thực sự đổi!
    const urlTopic = Number(searchParams.get("categoryId")) || 0;
    const urlDesign = Number(searchParams.get("designId")) || 0;
    const urlFlowerType = Number(searchParams.get("flowerTypeId")) || 0;
    const urlHasDiscount = searchParams.get("hasDiscount") === "true";
    const urlBestSeler = searchParams.get("bestSeler") === "true";
    
    setFilter((prev) => {
      const isDifferent = 
        prev.topicId !== urlTopic ||
        prev.designId !== urlDesign ||
        prev.flowerTypeId !== urlFlowerType ||
        prev.hasDiscount !== urlHasDiscount ||
        prev.bestSeler !== urlBestSeler;

      if (isDifferent) {
        return {
          ...prev,
          topicId: urlTopic,
          designId: urlDesign,
          flowerTypeId: urlFlowerType,
          hasDiscount: urlHasDiscount,
          bestSeler: urlBestSeler,
        };
      }
      return prev;
    });
  }, [searchParams]);

  useEffect(() => {
    // Khi filter đổi, tự động gọi hàm lọc
    if (onFilterChange) {
      onFilterChange(filter);
    }
  }, [filter, onFilterChange]);
  const handleTopicChange = (e) => {
    const value = e.target.value;
    setFilter((prev) => ({ ...prev, topicId: Number(value) || 0 }));
  };

  const handleDesignChange = (e) => {
    const value = e.target.value;
    setFilter((prev) => ({ ...prev, designId: Number(value) || 0 }));
  };

  const handleFlowerTypeChange = (e) => {
    const value = e.target.value;
    setFilter((prev) => ({ ...prev, flowerTypeId: Number(value) || 0 }));
  };

  const handleDiscountChange = (e) => {
    const hasDiscount = e.target.checked;
    setFilter((prev) => ({ ...prev, hasDiscount }));
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      topicId: 0,
      designId: 0,
      flowerTypeId: 0,
      hasDiscount: false,
      bestSeler: false,
      page: 1,
      size: 16,
    };
    setFilter(clearedFilters);
  };
  // useEffect(
  //   axios.post("")
  // );

  const handleApplyFilters = (e) => {
    e.preventDefault();
    if (onFilterChange) onFilterChange(filter);
  };

  return (
    <div className="filter-area">
      <div className="filters-row">
        <div className="filter-group">
          <label htmlFor="filter-topic">Chủ đề</label>
          <select
            id="filter-topic"
            value={filter.topicId}
            onChange={handleTopicChange}
          >
            <option value={0}>Tất cả</option>
            {topics.map((topic) => (
              <option
                key={topic.categoryId || topic.categoryName}
                value={topic.categoryId}
              >
                {topic.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="filter-design">Thiết kế</label>
          <select
            id="filter-design"
            value={filter.designId}
            onChange={handleDesignChange}
          >
            <option value={0}>Tất cả</option>
            {designs.map((design) => (
              <option
                key={design.designId || design.designName}
                value={design.designId}
              >
                {design.designName}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="filter-type">Loại hoa</label>
          <select
            id="filter-type"
            value={filter.flowerTypeId}
            onChange={handleFlowerTypeChange}
          >
            <option value={0}>Tất cả</option>
            {flowerTypes.map((type) => (
              <option
                key={type.flowerTypeId || type.typeName}
                value={type.flowerTypeId}
              >
                {type.typeName}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group filter-discount">
          <label>
            <input
              type="checkbox"
              checked={filter.hasDiscount}
              onChange={handleDiscountChange}
            />
            Giảm giá
          </label>
        </div>
        {/* {hasActiveFilters() && (
          <div className="fillter_space_btn">
            <button className="filters-btn" onClick={handleApplyFilters}>
              <i className="fas fa-filter"></i> Lọc
            </button>
            <button className="filters-btn" onClick={clearAllFilters}>
              <i className="fas fa-times"></i> Xóa
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ProductFillter;
