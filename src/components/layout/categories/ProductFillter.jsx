import React, { useEffect, useState } from "react";
import "./ProductFillter.css";
import axios from "axios";
// import { topics, Design, flowerTypes, flowerColors } from "../../../data/CategoriesData";

const ProductFillter = ({ onFilterChange }) => {
  const [topics, setTopics] = useState([]);
  const [designs, setDesigns] = useState([]);
  const [flowerTypes, setFlowerTypes] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/api/categories/")
    .then((res) => {
      setTopics(res.data.topics);
      setDesigns(res.data.designs);
      setFlowerTypes(res.data.flowerTypes)
    })
  }, [])
  const [filters, setFilters] = useState({
    topics: '',
    design: '',
    flowerTypes: '',
    hasDiscount: false,
  });

  const handleTopicChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, topics: value }));
  };

  const handleDesignChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, design: value }));
  };

  const handleFlowerTypeChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => ({ ...prev, flowerTypes: value }));
  };

  const handleDiscountChange = (e) => {
    const hasDiscount = e.target.checked;
    setFilters((prev) => ({ ...prev, hasDiscount }));
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      topics: '',
      design: '',
      flowerTypes: '',
      flowerColors: '',
      hasDiscount: false,
    };
    setFilters(clearedFilters);
  };

  const hasActiveFilters = () => {
    return (
      filters.topics !== '' ||
      filters.design !== '' ||
      filters.flowerTypes !== '' ||
      filters.flowerColors !== '' ||
      filters.hasDiscount
    );
  };

  // useEffect to call onFilterChange
  useEffect(() => {
    if (onFilterChange) onFilterChange(filters);
  }, [filters, onFilterChange]);

  return (
    <div className="filter-area">
      <div className="filters-row">
        <div className="filter-group">
          <label htmlFor="filter-topic">Chủ đề</label>
          <select id="filter-topic" value={filters.topics} onChange={handleTopicChange}>
            <option value="">Tất cả</option>
            {topics.map((topic) => (
              <option key={topic.id || topic.categoryName} value={topic.id}>{topic.categoryName}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="filter-design">Thiết kế</label>
          <select id="filter-design" value={filters.design} onChange={handleDesignChange}>
            <option value="">Tất cả</option>
            {designs.map((design) => (
              <option key={design.id || design.designName} value={design.id}>{design.designName}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="filter-type">Loại hoa</label>
          <select id="filter-type" value={filters.flowerTypes} onChange={handleFlowerTypeChange}>
            <option value="">Tất cả</option>
            {flowerTypes.map((type) => (
              <option key={type.id || type.typeName} value={type.id}>{type.typeName}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group filter-discount">
          <label>
            <input
              type="checkbox"
              checked={filters.hasDiscount}
              onChange={handleDiscountChange}
            />
            Giảm giá
          </label>
        </div>
        {hasActiveFilters() && (
          <button className="clear-filters-btn" onClick={clearAllFilters}>
            <i className="fas fa-times"></i> Xóa
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductFillter;
