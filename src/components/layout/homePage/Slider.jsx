import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./Slider.css";
const Slider = () => {
  return (
    <div
      id="carouselExampleInterval"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active" data-bs-interval="10000">
          <img
            src="https://in.flowercorner.vn/uploads/P67b80eac1dca11.10889059.webp"
            className="d-block w-100"
            alt=""
          />
        </div>
        <div className="carousel-item" data-bs-interval="2000">
          <img
            src="https://in.flowercorner.vn/uploads/P657fd247737038.75342862.webp"
            className="d-block w-100"
            alt=""
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://in.flowercorner.vn/uploads/P649ea8ef2ed4f0.09844576.webp"
            className="d-block w-100"
            alt=""
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Slider;
