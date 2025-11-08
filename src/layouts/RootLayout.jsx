import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar.jsx";
import Header from "../components/layout/Header.jsx";
import Categories from "../components/layout/Categories.jsx";
import Footer from "../components/layout/Footer.jsx";
import Metu from "../components/layout/Metu.jsx";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <Categories />
      <div className="">
        <Outlet />
      </div>
      <Footer />
      <Metu />
    </div>
  );
};

export default RootLayout;
