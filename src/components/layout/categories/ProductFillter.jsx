import React, { useState } from "react";
import "./ProductFillter.css";
import { topics, Design, flowerTypes, flowerColors } from "../../../data/CategoriesData";

const ProductFillter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    topics: '',
    design: '',
    flowerTypes: '',
    flowerColors: '',
    hasDiscount: false,
  });

  const handleTopicChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => {
      const newFilters = { ...prev, topics: value };
      onFilterChange?.(newFilters);
      return newFilters;
    });
  };

  const handleDesignChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => {
      const newFilters = { ...prev, design: value };
      onFilterChange?.(newFilters);
      return newFilters;
    });
  };

  const handleFlowerTypeChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => {
      const newFilters = { ...prev, flowerTypes: value };
      onFilterChange?.(newFilters);
      return newFilters;
    });
  };

  const handleColorChange = (e) => {
    const value = e.target.value;
    setFilters((prev) => {
      const newFilters = { ...prev, flowerColors: value };
      onFilterChange?.(newFilters);
      return newFilters;
    });
  };

  const handleDiscountChange = (e) => {
    const hasDiscount = e.target.checked;
    setFilters((prev) => {
      const newFilters = { ...prev, hasDiscount };
      onFilterChange?.(newFilters);
      return newFilters;
    });
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
    onFilterChange?.(clearedFilters);
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

  return (
    <div className="filter-area">
      <div className="filters-row">
        <div className="filter-group">
          <label htmlFor="filter-topic">Chủ đề</label>
          <select id="filter-topic" value={filters.topics} onChange={handleTopicChange}>
            <option value="">Tất cả</option>
            {topics.map((topic) => (
              <option key={topic.id} value={topic.id}>{topic.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="filter-design">Thiết kế</label>
          <select id="filter-design" value={filters.design} onChange={handleDesignChange}>
            <option value="">Tất cả</option>
            {Design.map((design) => (
              <option key={design.id} value={design.id}>{design.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="filter-type">Loại hoa</label>
          <select id="filter-type" value={filters.flowerTypes} onChange={handleFlowerTypeChange}>
            <option value="">Tất cả</option>
            {flowerTypes.map((type) => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="filter-color">Màu hoa</label>
          <select id="filter-color" value={filters.flowerColors} onChange={handleColorChange}>
            <option value="">Tất cả</option>
            {flowerColors.map((color) => (
              <option key={color.id} value={color.id}>{color.name}</option>
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
