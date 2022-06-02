import React from "react";
import { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
//import Cart from "./Cart";
import Footer from "./Footer";
import Loading from "./Loading";
import Navbar from "./Navbar";

const Layout = ({ showHeader, showFooter, children }) => {
  const { isLoading } = useContext(ShopContext);
  return (
    <>
      {showHeader && <Navbar />}
      {/*{showCart && <Cart />}*/}
      <div style={{ maxWidth: showHeader ? "1280px" : "100%", margin: "auto" }}>
        {children}
      </div>
      {showFooter && <Footer />}
      {isLoading && <Loading />}
    </>
  );
};

export default Layout;
