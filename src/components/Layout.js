import React from "react";
import Cart from "./Cart";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ showHeader, showCart, showFooter, children }) => {
  return (
    <>
      {showHeader && <Navbar />}
      {showCart && <Cart />}
      {children}
      {showFooter && <Footer />}
    </>
  );
};

export default Layout;
