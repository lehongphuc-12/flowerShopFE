import { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const flowerId = product.flowerId || product.id;
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => (item.id || item.flowerId) === flowerId
      );
      if (existingProduct) {
        return prevCart.map((item) =>
          (item.id || item.flowerId) === flowerId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, id: flowerId, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (flowerId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => (item.id || item.flowerId) !== flowerId)
    );
  };

  const updateQuantity = (flowerId, quantity) => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        (item.id || item.flowerId) === flowerId
          ? { ...item, quantity: quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalValue = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalValue,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
