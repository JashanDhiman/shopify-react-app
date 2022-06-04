import React, { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const { cart, signOut, accessToken, isMobile } = useContext(ShopContext);
  const [openMenu, setOpenMenu] = useState(false);
  let totalQuantity = 0;
  cart &&
    cart.lines.edges.map(({ node: { quantity } }) => {
      totalQuantity += quantity;
      return null;
    });
  return (
    <div className="header-navbar">
      {isMobile.current ? (
        <>
          <div className="logo">
            <a href="/homepage">
              <img
                src="//cdn.shopify.com/s/files/1/1380/2059/t/117/assets/leaf.png?v=99331424205049980601610950595"
                data-src="//cdn.shopify.com/s/files/1/1380/2059/t/117/assets/leaf.png?v=99331424205049980601610950595"
                alt="AllThatGrows"
                className=" ls-is-cached lazyloaded"
              />
            </a>
          </div>
          <div className="discoverMenu">
            <ul className="parent">
              {accessToken ? (
                <>
                  <li onClick={signOut}>
                    <Link to="#logout">
                      <FiLogOut />
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile">
                      <FaRegUser />
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
                {cart && <span className="count">{totalQuantity}</span>}
              </a>
            </div>
            <div
              className="hamBurgerMenu"
              onClick={() => {
                setOpenMenu(!openMenu);
              }}
            >
              <i className="icons">
                <GiHamburgerMenu />
              </i>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="logo">
            <a href="/homepage">
              <img
                src="//cdn.shopify.com/s/files/1/1380/2059/t/117/assets/logo.png?v=120999594118203418871610950602"
                data-src="//cdn.shopify.com/s/files/1/1380/2059/t/117/assets/logo.png?v=120999594118203418871610950602"
                alt="AllThatGrows"
                className=" ls-is-cached lazyloaded"
              />
            </a>
          </div>
          <div className="discoverMenu">
            <ul className="parent">
              <li className="seeds ">
                <a href="/collections/veg">Seeds</a>
                <i className="arrow-down">
                  <IoIosArrowDown />
                </i>
                <ul className="child" data-parent="Seeds">
                  <li>
                    <a href="/collections/veg">Vegetables</a>
                  </li>
                  <li>
                    <a href="/collections/veg">Herbs</a>
                  </li>
                  <li>
                    <a href="/collections/veg">Baby Leaves</a>
                  </li>
                  <li>
                    <a href="/collections/veg">Flowers</a>
                  </li>
                  <li>
                    <a href="/collections/veg">Fruits</a>
                  </li>
                  <li>
                    <a href="/collections/veg">Exotic Vegetables</a>
                  </li>
                  <li>
                    <a href="/collections/veg">Exotic Herbs</a>
                  </li>
                  <li>
                    <a href="/collections/veg">Edible Flowers</a>
                  </li>
                  <li>
                    <a href="/collections/veg">Desi Seeds</a>
                  </li>
                  <li>
                    <a href="/collections/veg">Grass</a>
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
                    <a href="/collections/veg">Microgreen Seeds</a>
                  </li>
                  <li>
                    <a href="/collections/veg">Microgreen Seed Kit</a>
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
                    <a href="/collections/veg">Grow kits</a>
                  </li>
                  <li>
                    <a href="/collections/veg">Seed Kits</a>
                  </li>
                  <li>
                    <a href="/collections/veg">Gifting</a>
                  </li>
                  <li>
                    <a href="/collections/veg">Microgreen Growing Kit</a>
                  </li>
                </ul>
              </li>
              <li className="garden supplies ">
                <a href="/collections/veg">Garden Supplies</a>
                <i className="arrow-down">
                  <IoIosArrowDown />
                </i>
                <ul className="child" data-parent="Garden Supplies">
                  <li>
                    <a href="/collections/veg">Grow Bags</a>
                  </li>
                  <li>
                    <a href="/collections/veg">Hydroponics</a>
                  </li>
                  <li>
                    <a href="https://www.allthatgrows.in/pages/jute-wall-planters">
                      Jute Wall Planters
                    </a>
                  </li>
                  <li>
                    <a href="/collections/veg">Garden Sprayers</a>
                  </li>
                  <li>
                    <a href="/collections/veg">Growing Medium</a>
                  </li>
                  <li>
                    <a href="/collections/veg">Gardening Tools</a>
                  </li>
                </ul>
              </li>
              {accessToken ? (
                <>
                  <li onClick={signOut}>
                    <Link to="#logout">
                      <FiLogOut />
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile">
                      <FaRegUser />
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
                {cart && <span className="count">{totalQuantity}</span>}
              </a>
            </div>
          </div>
        </>
      )}
      <div className="navMenu">
        <nav
          className="header_menu slideout-menu slideout-menu-left"
          id="menu"
          style={{ display: "none" }}
        >
          <div className="seeds ">
            <h3 className="active active1">Seeds</h3>
            <ul className="child" style={{ display: "none" }}>
              <li>
                <a href="/collections/vegetable-seeds">Vegetables</a>
              </li>
              <li>
                <a href="/collections/micro-greens-seeds">Microgreens</a>
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
              <li>
                <a href="/collections/seeds">View All</a>
              </li>
            </ul>
          </div>
          <div className="seed kits ">
            <a href="/collections/seed-kits" style={{ width: "100%" }}>
              <h3 className="no-child active1">Seed Kits</h3>
            </a>
          </div>
          <div className="grow your own food ">
            <h3 className="active active1">Grow Your Own Food</h3>
            <ul className="child" style={{ display: "none" }}>
              <li>
                <a href="/pages/complete-microgreen-growing-kit">
                  Microgreen Growing Kit
                </a>
              </li>
              <li>
                <a href="https://www.allthatgrows.in/pages/top-up-pack">
                  Top Up Pack
                </a>
              </li>
              <li>
                <a href="/products/grow-kit">Grow Kit</a>
              </li>
              <li>
                <a href="/pages/grow-kit-return-gift">Customized Grow Kit</a>
              </li>
            </ul>
          </div>
          <div className="garden supplies last atg-parent-new-tag">
            <h3 className="active active1">
              Garden Supplies
              <svg
                width="42"
                height="19"
                viewBox="0 0 42 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="42" height="19" rx="9.5" fill="#F6FFFC"></rect>
                <rect
                  x="0.5"
                  y="0.5"
                  width="41"
                  height="18"
                  rx="9"
                  stroke="#2EA380"
                  strokeOpacity="0.7"
                ></rect>
                <path
                  d="M11.2915 6.493C11.3455 6.493 11.3905 6.496 11.4265 6.502C11.4625 6.505 11.494 6.514 11.521 6.529C11.551 6.541 11.5795 6.5605 11.6065 6.5875C11.6335 6.6115 11.6635 6.6445 11.6965 6.6865L15.112 11.038C15.1 10.933 15.091 10.831 15.085 10.732C15.082 10.63 15.0805 10.5355 15.0805 10.4485V6.493H16.147V13H15.5215C15.4255 13 15.346 12.985 15.283 12.955C15.22 12.925 15.1585 12.871 15.0985 12.793L11.6965 8.4595C11.7055 8.5555 11.7115 8.6515 11.7145 8.7475C11.7205 8.8405 11.7235 8.926 11.7235 9.004V13H10.657V6.493H11.2915ZM22.0137 6.493V7.456H19.1292V9.2605H21.4017V10.192H19.1292V12.0325H22.0137V13H17.9097V6.493H22.0137ZM22.9071 6.493H23.9241C24.0291 6.493 24.1161 6.5185 24.1851 6.5695C24.2571 6.6175 24.3051 6.6835 24.3291 6.7675L25.4361 10.66C25.4631 10.756 25.4871 10.861 25.5081 10.975C25.5321 11.086 25.5546 11.2045 25.5756 11.3305C25.5996 11.2045 25.6251 11.086 25.6521 10.975C25.6821 10.861 25.7136 10.756 25.7466 10.66L27.0246 6.7675C27.0486 6.6985 27.0951 6.6355 27.1641 6.5785C27.2361 6.5215 27.3231 6.493 27.4251 6.493H27.7806C27.8856 6.493 27.9726 6.5185 28.0416 6.5695C28.1106 6.6175 28.1586 6.6835 28.1856 6.7675L29.4546 10.66C29.5206 10.852 29.5776 11.065 29.6256 11.299C29.6466 11.182 29.6676 11.0695 29.6886 10.9615C29.7126 10.8535 29.7366 10.753 29.7606 10.66L30.8676 6.7675C30.8886 6.6925 30.9351 6.628 31.0071 6.574C31.0791 6.52 31.1661 6.493 31.2681 6.493H32.2176L30.1971 13H29.1036L27.6816 8.554C27.6636 8.497 27.6441 8.4355 27.6231 8.3695C27.6051 8.3035 27.5871 8.233 27.5691 8.158C27.5511 8.233 27.5316 8.3035 27.5106 8.3695C27.4926 8.4355 27.4746 8.497 27.4566 8.554L26.0211 13H24.9276L22.9071 6.493Z"
                  fill="#2EA380"
                ></path>
              </svg>
            </h3>
            <ul
              className="child"
              data-parent="Garden Supplies"
              data-level="2"
              style={{ display: "none" }}
            >
              <li>
                <a href="/pages/grow-bags">Grow Bags</a>
              </li>

              <li>
                <a href="https://www.allthatgrows.in/pages/raised-beds">
                  Raised Beds
                </a>
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
              <li>
                <a href="/collections/garden-supplies">View All</a>
              </li>
            </ul>
          </div>
          <div className="header-user-cont">
            <ul>
              <li className=" ">
                <a href="/pages/bulk-orders">Wholesale</a>
              </li>
              <li className=" blog-link">
                <a href="/blogs/posts">Blog</a>
              </li>
              <li className="green-link login-link cb-mobile-hide">
                <a href="/account/login">Login</a>
              </li>
            </ul>
            <ul className="cb_mobile_social_icon">
              <li className="inst-ico">
                <a
                  href="https://www.instagram.com/allthatgrows.in"
                  target="_blank"
                  title="Instagram"
                >
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </a>
              </li>
              <li className="fb-ico">
                <a
                  href="https://www.facebook.com/allthatgrows.in"
                  target="_blank"
                  title="Facebook"
                >
                  <i className="fa fa-facebook" aria-hidden="true"></i>
                </a>
              </li>
              <li className="pin-ico">
                <a
                  href="https://www.pinterest.com/allthatgrows"
                  target="_blank"
                  title="Pinterest"
                >
                  <i className="fa fa-pinterest-p" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
