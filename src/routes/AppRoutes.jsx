import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "../layouts/RootLayout.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import LoginLayout from "../layouts/LoginLayout.jsx";
import Register from "../pages/Register.jsx";
import Categories from "../pages/Categories.jsx";
import ProductPage from "../pages/ProductPage.jsx";
import Cart from "../pages/Cart.jsx";
import Hoso from "../pages/Hoso.jsx";
import Order from "../pages/Order.jsx";
import ConfirmOrder from "../pages/ConfirmOrder.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="categories" element={<Categories />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="hoso" element={<Hoso />} />
        <Route path="order" element={<Order />} />
        <Route path="confirm-order" element={<ConfirmOrder />} />
      </Route>
      <Route path="/login" element={<LoginLayout />}>
        <Route index element={<Login />} />
      </Route>
      <Route path="/register" element={<LoginLayout />}>
        <Route index element={<Register />} />
      </Route>
    </>
  )
);

export default router;
