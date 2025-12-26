import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faLocationDot, faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { flowers } from "../data/ProductsData.js";
import ProductDisplay from "../components/layout/product/ProductDisplay";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProductCard from "../components/products/ProductCard";
import "swiper/css";
import "swiper/css/navigation";
import useProductDetail from "../hooks/useProductDetail";
import LoadingSpinner from "../components/common/LoadingSpinner";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading } = useProductDetail(id);

  if (loading) {
    return (
      <div className="container product-page">
        <LoadingSpinner message="Đang tải thông tin sản phẩm..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container product-page">
        <div className="not-found-message">Không tìm thấy sản phẩm!</div>
        <button className="btn" onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </div>
    );
  }

  const flowerName = product.flowerName || product.name || "";
  const imageUrl = product.imageUrl || product.url || "";
  const price = product.price || 0;
  const discount = product.discount || 0;
  const finalPrice = price - (price * discount) / 100;
  return (
    <div className="container product-page">
      <div className="back-link">
        <a href="/categories">← Quay lại</a>
      </div>
      <div className="product-detail-grid">
        <div className="product-detail-image-box">
          <img src={imageUrl} alt={flowerName} className="main-product-image" />
        </div>
        <div className="product-detail-info">
          <h1>{flowerName}</h1>
          <div className="product-desc">{product.description}</div>
          <div className="price-container">
            <span className="product-final-price">{finalPrice.toLocaleString()}đ</span>
            {discount > 0 && <span className="product-original-price">{price.toLocaleString()}đ</span>}
            {discount > 0 && <span className="product-discount">-{discount}%</span>}
          </div>
          <div className="call_us_ship">
            <div className="buy-in-store">Mua tại cửa hàng</div>
            <div className="ship-item">
              <span>Hòa Xuân, Cẩm Lệ, Đà Nẵng</span>
              <span className="ship-phone">
                <a href="tel:0788580223">
                  <FontAwesomeIcon icon={faPhoneVolume} /> 0788580223
                </a>
              </span>
              <span className="ship-map">
                <a href="https://goo.gl/maps/4g4VJXTPVto5XwVk8" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLocationDot} /> Bản đồ
                </a>
              </span>
            </div>
          </div>
          <div className="orderBox">
            <form
              onSubmit={e => {
                e.preventDefault();
                alert("Đặt hoa thành công!");
              }}
            >
              <label htmlFor="quantity">Số lượng</label>
              <input id="quantity" name="quantity" min="1" type="number" defaultValue={1} />
              <button type="submit" className="btn btn-primary">
                <FontAwesomeIcon icon={faCartPlus} /> Đặt hoa ngay
              </button>
            </form>
          </div>
          <div className="more-Buttons"></div>
        </div>
      </div>
      {/* Section sản phẩm liên quan */}
      <RelatedProducts />
    </div>
  );
};

export default ProductPage;
function RelatedProducts() {
  return (
    <div className="related-products">
      <h4>Sản phẩm liên quan</h4>
      <Swiper
        spaceBetween={24}
        slidesPerView={4}
        slidesPerGroup={1}
        navigation
        modules={[Navigation]}
        style={{padding: "16px 0"}}
        breakpoints={{
          992: { slidesPerView: 4 },
          768: { slidesPerView: 2 },
          0:   { slidesPerView: 1 },
        }}
      >
        {flowers.map((item) => (
          <SwiperSlide key={item.id}><ProductCard product={item} /></SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}



