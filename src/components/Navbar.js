import React, { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { IoIosArrowDown, IoMdSearch } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import "../styles/navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { cart, signOut, accessToken } = useContext(ShopContext);
  return (
    <div className="header-navbar">
      <div className="logo">
        <a href="/homepage">
          <img
            src="//cdn.shopify.com/s/files/1/1380/2059/t/117/assets/logo.png?v=120999594118203418871610950602"
            data-src="//cdn.shopify.com/s/files/1/1380/2059/t/117/assets/logo.png?v=120999594118203418871610950602"
            alt="AllThatGrows"
            className=" ls-is-cached lazyloaded"
          />
        </a>
        <a href="/homepage" className="leaf-only">
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
                <a href="/collections/veg">Vegetables</a>
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
          {accessToken ? (
            <>
              <li onClick={signOut}>
                <Link to="#">
                  <FiLogOut />
                </Link>
              </li>
              <li>
                <Link to="/profile">
                  <FiLogOut />
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/">
                <FiLogIn />
              </Link>
            </li>
          )}
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
        {/*<div className="header-search search_cont" id="header-search">
          <i className="search-icon">
            <IoMdSearch />
          </i>
        </div>*/}
        <div className="header-cart">
          <a href="/cart">
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.55 11C15.3 11 15.96 10.59 16.3 9.97L19.88 3.48C20.25 2.82 19.77 2 19.01 2H4.21L3.27 0H0V2H2L5.6 9.59L4.25 12.03C3.52 13.37 4.48 15 6 15H18V13H6L7.1 11H14.55ZM5.16 4H17.31L14.55 9H7.53L5.16 4ZM6 16C4.9 16 4.01 16.9 4.01 18C4.01 19.1 4.9 20 6 20C7.1 20 8 19.1 8 18C8 16.9 7.1 16 6 16ZM16 16C14.9 16 14.01 16.9 14.01 18C14.01 19.1 14.9 20 16 20C17.1 20 18 19.1 18 18C18 16.9 17.1 16 16 16Z"
                fill="black"
              ></path>
            </svg>
            {cart && <span className="count">{cart.lines.edges.length}</span>}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
