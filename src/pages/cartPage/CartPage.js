import React, { useContext } from "react";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import { ShopContext } from "../../contexts/ShopContext";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

import "./cartPage.css";

const CartPage = () => {
  const { cart, removeItemFromCart, updateItemToCart, isLoading } =
    useContext(ShopContext);
  return (
    <Layout showFooter={true} showHeader={true} showCart={true}>
      <div className="innerPadding">
        <div className="product_page_pagination active">
          <div id="page-header-actions">
            <ul className="breadcrumbs">
              <li>
                <a href="/homepage" title="">
                  Home
                </a>
              </li>
              <li>
                {" "}
                <i className="icons">
                  <FaAngleRight />
                </i>{" "}
              </li>
              <li>
                <span> Your Cart</span>
              </li>
            </ul>
          </div>
          <div className="cell title">
            <h1>Your Cart</h1>
          </div>
        </div>
        {cart && (
          <div>
            {cart.lines.edges.length > 0 ? (
              <>
                <div
                  style={{ overflow: "auto", padding: "1rem" }}
                  className="line-items"
                >
                  <div className="cart-row" id="table-heading">
                    <div className="col1">ITEMS</div>
                    <div className="row-col col2">
                      <div></div>
                      <div>QUANTITY</div>
                      <div className="columns">PRICE</div>
                    </div>
                  </div>
                  {cart.lines.edges.map((node, index) => {
                    //const merchandiseId = node.node.merchandise.id;
                    const { id, quantity } = node.node;
                    const {
                      product: { title },
                      image: { url },
                      priceV2: { amount },
                      sku,
                    } = node.node.merchandise;
                    const totalPrice =
                      node.node.estimatedCost.subtotalAmount.amount;
                    return (
                      <div key={index} className="cart-row">
                        <div className="col1">
                          <img
                            style={{
                              height: "100px",
                              width: "100% !important",
                            }}
                            src={url}
                            alt="img"
                          />
                        </div>
                        <div className="row-col col2">
                          <div>
                            <a
                              className="title"
                              href="/products/radish-white-microgreens"
                              title="Radish White Microgreen Seeds"
                            >
                              {title}
                            </a>
                            <p
                              className="description"
                              style={{
                                color: "#5d5d5d",
                                fontSize: "0.8rem",
                              }}
                            >
                              SKU: {sku}
                            </p>
                          </div>
                          <div className="actions columns">
                            <div className="selector-qty">
                              <input
                                className="minus qty-btn cursor-pointer"
                                type="button"
                                defaultValue="-"
                                onClick={() =>
                                  updateItemToCart(id, quantity - 1)
                                }
                              />
                              <input
                                data-max="99"
                                type="text"
                                name="updates[]"
                                readOnly
                                value={quantity}
                                className="qty_input"
                              />
                              <input
                                className="plus qty-btn cursor-pointer"
                                type="button"
                                defaultValue="+"
                                onClick={() =>
                                  updateItemToCart(id, quantity + 1)
                                }
                              />
                            </div>
                            <i
                              style={{ cursor: "pointer", color: "#5d5d5d" }}
                              onClick={() => removeItemFromCart(id)}
                            >
                              <RiDeleteBinLine />
                            </i>
                          </div>
                          <div className="pricing columns">
                            <div
                              className="amounts"
                              style={{ color: "#5d5d5d", fontSize: "0.9rem" }}
                            >
                              <span className="price">₹ {amount}</span>
                              <span> x </span>
                              <span className="quantity">{quantity}</span>
                            </div>
                            <div className="price line-price">{totalPrice}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="atg_samples display-block">
                    <span className="samples_flicker"></span>
                    <span className="samples_text">
                      <strong>Congratulations!</strong>
                      <br></br>Your free giveaway has been added to the cart -
                      Free seed samples :)
                    </span>
                  </div>
                </div>
                <div className="cart-btns display-block">
                  <div className="continue-shopping large-6 form-actions">
                    <a href="/homepage" className="text_button">
                      <i className="icons">
                        <FaAngleLeft />
                      </i>
                      continue shopping
                    </a>
                  </div>
                </div>
                <div className="checkout-actions">
                  <h2>
                    <span className="price-prefix">Subtotal </span>
                    <span className="price">
                      ₹ {cart.estimatedCost.totalAmount.amount}
                    </span>
                  </h2>

                  <div className="form-actions">
                    <span className="cart_button">
                      <a href={cart.checkoutUrl}>
                        <button>CHECK-OUT</button>
                      </a>
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "70vh",
                  textAlign: "center",
                }}
              >
                <h2>Cart is Empty</h2>
              </div>
            )}
          </div>
        )}
        {isLoading && <Loading />}
      </div>
    </Layout>
  );
};

export default CartPage;
