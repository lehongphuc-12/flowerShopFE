import { Link } from "react-router-dom";
import Card from "../ui/Card";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const flowerId = product.flowerId || product.id;
  const flowerName = product.flowerName || product.name;
  const imageUrl = product.imageUrl || product.url;
  const price = product.price || 0;
  const discount = product.discount || 0;
  
  const finalPrice = price - (price * discount) / 100;
  // console.log(product);
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: Implement add to cart functionality
    console.log("Thêm vào giỏ:", product);
    // Có thể thêm toast notification hoặc update cart state ở đây
  };

  return (
    <Card>
      <Link to={`/product/${flowerId}`} className="product-card-link">
        <div className="product-card">
          <img src={imageUrl || product.url} alt={flowerName} />

          <h5>{flowerName}</h5>

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
