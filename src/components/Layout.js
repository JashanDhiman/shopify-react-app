import React from "react";
import Cart from "./Cart";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ showHeader, showCart, showFooter, children }) => {
  return (
    <>
      {showHeader && <Navbar />}
      {showCart && <Cart />}
      <div style={{ maxWidth: "1280px", margin: "auto" }}>{children}</div>
      {showFooter && <Footer />}
    </>
  );
};

export default Layout;
