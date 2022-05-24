import React from "react";
//import Cart from "./Cart";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ showHeader, showFooter, children }) => {
  return (
    <>
      {showHeader && <Navbar />}
      {/*{showCart && <Cart />}*/}
      <div style={{ maxWidth: showHeader ? "1280px" : "100%", margin: "auto" }}>
        {children}
      </div>
      {showFooter && <Footer />}
    </>
  );
};

export default Layout;
