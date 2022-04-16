import React, { useContext } from "react";
import logo from "../images/leafLogo.webp";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillBucketFill } from "react-icons/bs";
import { ShopContext } from "../contexts/ShopContext";
const Navbar = () => {
  const { cartOpen, checkout, handleSignout } = useContext(ShopContext);
  return (
    <div className="nav-bar-main">
      <div className="nav-bar-inner">
        <a href="/">
          <img src={logo} alt="leaf logo" />
        </a>
      </div>
      <div className="nav-bar-inner">
        <ul>
          <li>Seeds</li>
          <li>Microgreens</li>
          <li>kits & gifts</li>
          <li>Garden suplies</li>
          <li>Discover</li>
          <li onClick={handleSignout}>Sign-Out</li>
        </ul>
      </div>
      <div className="nav-bar-inner">
        <ul>
          <li style={{ cursor: "pointer" }}>
            <i>
              <AiOutlineSearch />
            </i>
          </li>
          <li onClick={() => cartOpen(true)} style={{ cursor: "pointer" }}>
            <BsFillBucketFill />
            {checkout && (
              <span
                style={{
                  position: "absolute",
                  top: "30%",
                  fontSize: "1rem",
                  border: "1px solid #fff",
                  width: "1.3rem",
                  height: "1.3rem",
                  borderRadius: "50%",
                  textAlign: "center",
                }}
              >
                {checkout.lineItems.length}
              </span>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
