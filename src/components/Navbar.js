import React from "react";
//import React, { useContext } from "react";
//import { ShopContext } from "../contexts/ShopContext";
//import logo from "../images/leafLogo.webp";
//import { AiOutlineSearch } from "react-icons/ai";
//import { BsFillBucketFill } from "react-icons/bs";
//import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import "../styles/navbar.css";

const Navbar = () => {
  //const { cartOpen, cart, signOut, accessToken } = useContext(ShopContext);
  return (
    <div className="header-navbar">
      <div className="logo">
        <a href="/">
          <img
            src="//cdn.shopify.com/s/files/1/1380/2059/t/117/assets/logo.png?v=120999594118203418871610950602"
            data-src="//cdn.shopify.com/s/files/1/1380/2059/t/117/assets/logo.png?v=120999594118203418871610950602"
            alt="AllThatGrows"
            className=" ls-is-cached lazyloaded"
          />
        </a>
        <a href="/" className="leaf-only">
          <img
            src="//cdn.shopify.com/s/files/1/1380/2059/files/dot-img_1x.jpg?v=12921307864587141952"
            data-src="//cdn.shopify.com/s/files/1/1380/2059/t/117/assets/leaf.png?v=99331424205049980601610950595"
            alt="AllThatGrows"
            className="lazyload"
          />
        </a>
      </div>
      <div className="discoverMenu">
        <ul className="parent">
          <li className="seeds ">
            <a href="/collections/seeds">Seeds</a>
            <i className="arrow-down">
              <IoIosArrowDown />
            </i>
            <ul className="child" data-parent="Seeds">
              <li>
                <a href="/collections/vegetable-seeds">Vegetables</a>
              </li>
              <li>
                <a href="/collections/herb-seeds">Herbs</a>
              </li>
              <li>
                <a href="/collections/baby-leaf-seeds">Baby Leaves</a>
              </li>
              <li>
                <a href="/collections/flower-seeds">Flowers</a>
              </li>
              <li>
                <a href="/collections/fruit-seeds">Fruits</a>
              </li>
              <li>
                <a href="/collections/exotic-vegetables">Exotic Vegetables</a>
              </li>
              <li>
                <a href="/collections/exotic-herbs">Exotic Herbs</a>
              </li>
              <li>
                <a href="/pages/edible-flowers">Edible Flowers</a>
              </li>
              <li>
                <a href="/collections/desi-seeds">Desi Seeds</a>
              </li>
              <li>
                <a href="/collections/grass-seeds">Grass</a>
              </li>
            </ul>
          </li>
          <li className="microgreens ">
            <a href="#id">Microgreens</a>
            <i className="arrow-down">
              <IoIosArrowDown />
            </i>
            <ul className="child" data-parent="Microgreens">
              <li>
                <a href="/collections/micro-greens-seeds">Microgreen Seeds</a>
              </li>
              <li>
                <a href="/products/microgreen-seeds-kit">Microgreen Seed Kit</a>
              </li>
            </ul>
          </li>
          <li className="grow your own food ">
            <a href="#id">Grow Your Own Food</a>
            <i className="arrow-down">
              <IoIosArrowDown />
            </i>
            <ul className="child" data-parent="Grow Your Own Food">
              <li>
                <a href="/pages/complete-microgreen-growing-kit">Microgreens</a>
              </li>
            </ul>
          </li>
          <li className="kits &amp; gifts last">
            <a href="#id">Kits &amp; Gifts</a>
            <label>
              <img
                src="//cdn.shopify.com/s/files/1/1380/2059/t/117/assets/new-label.png?v=138877172262261017291610950620"
                data-src="//cdn.shopify.com/s/files/1/1380/2059/t/117/assets/new-label.png?v=138877172262261017291610950620"
                alt="AllThatGrows"
                className=" ls-is-cached lazyloaded"
              />
            </label>
            <i className="arrow-down">
              <IoIosArrowDown />
            </i>
            <ul className="child" data-parent="Kits &amp; Gifts">
              <li>
                <a href="/products/grow-kit">Grow kits</a>
              </li>
              <li>
                <a href="/collections/seed-kits">Seed Kits</a>
              </li>
              <li>
                <a href="/pages/grow-kit-return-gift">Gifting</a>
              </li>
              <li>
                <a href="/products/complete-microgreen-growing-kit">
                  Microgreen Growing Kit
                </a>
              </li>
            </ul>
          </li>
          <li className="garden supplies ">
            <a href="/collections/garden-supplies">Garden Supplies</a>
            <i className="arrow-down">
              <IoIosArrowDown />
            </i>
            <ul className="child" data-parent="Garden Supplies">
              <li>
                <a href="/pages/grow-bags">Grow Bags</a>
              </li>
              <li>
                <a href="/pages/hydroponics">Hydroponics</a>
              </li>
              <li>
                <a href="https://www.allthatgrows.in/pages/jute-wall-planters">
                  Jute Wall Planters
                </a>
              </li>
              <li>
                <a href="/pages/garden-sprayers">Garden Sprayers</a>
              </li>
              <li>
                <a href="/collections/growing-medium">Growing Medium</a>
              </li>
              <li>
                <a href="/collections/gardening-tools">Gardening Tools</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="search-cart">
        <span className="login-link mob-only">
          <a href="/account/login">
            <img
              src="//cdn.shopify.com/s/files/1/1380/2059/files/dot-img_1x.jpg?v=12921307864587141952"
              data-src="//cdn.shopify.com/s/files/1/1380/2059/t/117/assets/login_35x.png?v=13030164457089829911610950601"
              id="login-link"
              className="login_link lazyload"
              alt="login"
            />
          </a>
        </span>
        <div className="header-search search_cont" id="header-search">
          <i className="search-icon">
            <FaSearch />
          </i>
        </div>
        <div className="header-cart">
          <a href="/cart">
            <img
              src="//cdn.shopify.com/s/files/1/1380/2059/t/117/assets/atg-cart.png?v=149032906229090180871610950461"
              data-src="//cdn.shopify.com/s/files/1/1380/2059/t/117/assets/atg-cart.png?v=149032906229090180871610950461"
              alt="Cart Icon"
              className=" ls-is-cached lazyloaded"
            />
            <span className="count">0</span>
          </a>
        </div>
      </div>
    </div>
    //<div className="nav-bar-main">
    //  <div className="nav-bar-inner">
    //    <a href="/">
    //      <img src={logo} alt="leaf logo" />
    //    </a>
    //  </div>
    //  <div className="nav-bar-inner">
    //    <ul>
    //      {/*<li>Seeds</li>
    //      <li>Microgreens</li>
    //      <li>kits & gifts</li>
    //      <li>Garden suplies</li>
    //      <li>Discover</li>*/}
    //      <li>
    //        <Link to="/homepage" style={{ color: "white" }}>
    //          Home
    //        </Link>
    //      </li>
    //      {accessToken ? (
    //        <>
    //          <li>
    //            <Link to="/profile" style={{ color: "white" }}>
    //              Profile
    //            </Link>
    //          </li>
    //          <li onClick={signOut}>
    //            <Link to="#" style={{ color: "white" }}>
    //              Sign-Out
    //            </Link>
    //          </li>
    //        </>
    //      ) : (
    //        <li>
    //          <Link to="/" style={{ color: "white" }}>
    //            Sign-In
    //          </Link>
    //        </li>
    //      )}
    //    </ul>
    //  </div>
    //  <div className="nav-bar-inner">
    //    <ul>
    //      <li style={{ cursor: "pointer" }}>
    //        <i>
    //          <AiOutlineSearch />
    //        </i>
    //      </li>
    //      <li onClick={() => cartOpen(true)} style={{ cursor: "pointer" }}>
    //        <BsFillBucketFill />
    //        {cart && (
    //          <span
    //            style={{
    //              position: "absolute",
    //              top: "30%",
    //              fontSize: "1rem",
    //              border: "1px solid #fff",
    //              width: "1.3rem",
    //              height: "1.3rem",
    //              borderRadius: "50%",
    //              textAlign: "center",
    //            }}
    //          >
    //            {cart.lines.edges.length}
    //          </span>
    //        )}
    //      </li>
    //    </ul>
    //  </div>
    //</div>
  );
};

export default Navbar;
