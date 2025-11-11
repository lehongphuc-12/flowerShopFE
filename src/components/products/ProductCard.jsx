import { Link } from "react-router-dom";
import Card from "../ui/Card";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { name, price, discount, id } = product;
  const finalPrice = price - (price * discount) / 100;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement add to cart functionality
    console.log("Thêm vào giỏ:", product);
    // Có thể thêm toast notification hoặc update cart state ở đây
  };

  return (
    <Card>
      <Link to={``} className="product-card-link">
        <div className="product-card">
          <img src={product.url} alt={name} />

          <h5>{name}</h5>

          <div className="price-container">
            <p className="final-price">{finalPrice.toLocaleString()}đ</p>
            {discount > 0 ? (
              <p className="original-price">{price.toLocaleString()}đ</p>
            ) : null}
          </div>

          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            aria-label="Thêm vào giỏ hàng"
          >
            <i className="fas fa-shopping-cart"></i>
            Thêm vào giỏ
          </button>
        </div>
      </Link>
    </Card>
  );
}
