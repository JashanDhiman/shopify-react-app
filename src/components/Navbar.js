import React, { useContext } from "react";
import logo from "../images/leafLogo.webp";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillBucketFill } from "react-icons/bs";
import { ShopContext } from "../contexts/ShopContext";
const Navbar = () => {
  const { cartOpen } = useContext(ShopContext);
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
        </ul>
      </div>
      <div className="nav-bar-inner">
        <ul>
          <li>
            <i>
              <AiOutlineSearch />
            </i>
          </li>
          <li onClick={() => cartOpen(true)}>
            <BsFillBucketFill />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
