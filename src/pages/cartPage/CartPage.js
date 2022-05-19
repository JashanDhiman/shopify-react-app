import React, { useContext } from "react";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import { ShopContext } from "../../contexts/ShopContext";
import { AiFillDelete } from "react-icons/ai";

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
                <a href="https://www.allthatgrows.in" title="">
                  Home
                </a>
              </li>

              <li>
                <span>Your Cart</span>
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
                <div style={{ overflow: "auto", padding: "1rem" }}>
                  <div className="cart-items-head">
                    <div className="col1">Items</div>
                    <div className="col2">
                      {/*<div>Title</div>*/}
                      <div>Quantity</div>
                      <div>Price</div>
                    </div>
                  </div>
                  <hr></hr>
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
                      <div key={index}>
                        <div className="col1">
                          <img
                            style={{ height: "100px" }}
                            src={url}
                            alt="img"
                          />
                          <div>
                            <a
                              className="title"
                              href="/products/radish-white-microgreens"
                              title="Radish White Microgreen Seeds"
                            >
                              {title}
                            </a>
                            <p className="description">SKU: {sku}</p>
                          </div>
                        </div>
                        <div className="actions small-8 medium-4 large-3 columns">
                          <div className="selector-qty">
                            <input
                              className="minus qty-btn cursor-pointer"
                              type="button"
                              defaultValue="-"
                              onClick={() => updateItemToCart(id, quantity - 1)}
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
                              onClick={() => updateItemToCart(id, quantity + 1)}
                            />
                          </div>
                          <i
                            style={{ cursor: "pointer" }}
                            onClick={() => removeItemFromCart(id)}
                          >
                            <AiFillDelete />
                          </i>
                        </div>

                        <div className="pricing small-4 medium-3 large-2 columns">
                          <div className="amounts">
                            <span className="price">₹ {amount}</span>
                            <span> x </span>
                            <span className="quantity">{quantity}</span>
                          </div>
                          <div className="price line-price">₹ {totalPrice}</div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="atg_samples display-block">
                    <span className="samples_flicker">
                      <img
                        src="//cdn.shopify.com/s/files/1/1380/2059/files/dot-img_1x.jpg?v=12921307864587141952"
                        data-src="//cdn.shopify.com/s/files/1/1380/2059/t/117/assets/leafv2.gif?v=137651774246152169551610950596"
                        alt=""
                        className="lazyload"
                      />
                    </span>
                    <span className="samples_text">
                      <strong>Congratulations!</strong>
                      <br></br>Your free giveaway has been added to the cart -
                      Free seed samples :)
                    </span>
                  </div>
                </div>
                <div>
                  <p style={{ margin: "0" }}>
                    Sub-Total - {cart.estimatedCost.totalAmount.amount}
                  </p>
                  <a href={cart.checkoutUrl}>
                    <button>CHECK-OUT</button>
                  </a>
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
    //<Layout showFooter={true} showHeader={true} showCart={true}>
    //  <div
    //    id="content-wrap"
    //    className="default has-sidebar sidebar-right mobile_edits display-block"
    //  >
    //    <div className="small-12 columns primary no-padding">
    //      <form
    //        id="cartform"
    //        action="/cart"
    //        method="post"
    //        className="display-block"
    //        noValidate=""
    //      >
    //        <div className="form-actions"></div>

    //        <div className="line-items" id="line-items-ajax">
    //          <div className="line-item line-item-header">
    //            <div className="row">
    //              <div className="small-3 medium-2 large-1 columns item-colA">
    //                Items
    //              </div>
    //              <div className="small-9 medium-10 large-11 columns grow-cart">
    //                <div className="row">
    //                  <div className="medium-5 large-7 columns blank-colA">
    //                    Blank
    //                  </div>
    //                  <div className="actions small-8 medium-4 large-3 columns">
    //                    Quantity
    //                  </div>
    //                  <div className="pricing small-4 medium-3 large-2 columns price-colA">
    //                    Price
    //                  </div>
    //                </div>
    //              </div>
    //            </div>
    //          </div>

    //          <div className="line-item  product  1">
    //            <div className="row">
    //              <div className="small-3 medium-2 large-1 columns">
    //                <a
    //                  className="title"
    //                  href="/products/radish-white-microgreens?variant=35696104515"
    //                  title="Radish White Microgreen Seeds"
    //                >
    //                  <img
    //                    src="//cdn.shopify.com/s/files/1/1380/2059/products/Radish-White_small.jpg?v=1598074857"
    //                    data-src="//cdn.shopify.com/s/files/1/1380/2059/products/Radish-White_small.jpg?v=1598074857"
    //                    alt="Radish White Microgreen Seeds"
    //                    className=" lazyloaded"
    //                  />
    //                </a>
    //              </div>

    //              <div className="small-9 medium-10 large-11 columns grow-cart">
    //                <div className="row">
    //                  <div className="medium-5 large-7 columns">
    //                    <a
    //                      className="title"
    //                      href="/products/radish-white-microgreens"
    //                      title="Radish White Microgreen Seeds"
    //                    >
    //                      Radish White Microgreen Seeds
    //                    </a>

    //                    <p className="description">SKU: MICRO101</p>
    //                  </div>

    //                  <div className="actions small-8 medium-4 large-3 columns">
    //                    <div className="selector-qty">
    //                      <input
    //                        className="minus qty-btn cursor-pointer"
    //                        type="button"
    //                        defaultValue="-"
    //                      />
    //                      <input
    //                        data-max="99"
    //                        type="text"
    //                        name="updates[]"
    //                        defaultValue="1"
    //                        className="qty_input"
    //                        id="updates_35696104515"
    //                        //onKeyPress="return isNumber(event)"
    //                        //onKeyUp="return isValid(this)"
    //                        data-parsley-id="12"
    //                      />
    //                      <input
    //                        className="plus qty-btn cursor-pointer"
    //                        type="button"
    //                        defaultValue="+"
    //                      />
    //                    </div>

    //                    <a
    //                      className="remove-from-cart"
    //                      data-variant-id="35696104515"
    //                      href="/cart/change?line=1&amp;quantity=0"
    //                    >
    //                      <i className="icons" title="Delete"></i>
    //                      <span className="tooltip">Delete</span>
    //                    </a>
    //                    <div className="cart-variants"></div>
    //                  </div>

    //                  <div className="pricing small-4 medium-3 large-2 columns">
    //                    <div className="amounts">
    //                      <span className="price">150</span>
    //                      <span>x</span>
    //                      <span className="quantity">1</span>
    //                    </div>
    //                    <div className="price line-price">150</div>
    //                  </div>
    //                </div>
    //              </div>
    //            </div>
    //          </div>
    //          <div className="atg_samples display-block">
    //            <span className="samples_flicker">
    //              <img
    //                src="//cdn.shopify.com/s/files/1/1380/2059/files/dot-img_1x.jpg?v=12921307864587141952"
    //                data-src="//cdn.shopify.com/s/files/1/1380/2059/t/117/assets/leafv2.gif?v=137651774246152169551610950596"
    //                alt=""
    //                className="lazyload"
    //              />
    //            </span>
    //            <span className="samples_text">
    //              <strong>Congratulations!</strong>
    //              <br></br>Your free giveaway has been added to the cart - Free
    //              seed samples :)
    //            </span>
    //          </div>
    //        </div>

    //        <div className="cart-btns display-block">
    //          <div className="continue-shopping large-6 form-actions">
    //            <a href="/collections/all" className="text_button">
    //              continue shopping
    //            </a>
    //          </div>

    //          <div className="cart-update-btn large-6 form-actions">
    //            <input
    //              type="submit"
    //              className="text_button"
    //              id="update-cart"
    //              name="update"
    //              value="Update"
    //            />
    //          </div>
    //        </div>

    //        <div className="cart_bottom display-block">
    //          <div className="small-12 medium-6 large-6 columns order mob-full-wid">
    //            <div className="cart_note">
    //              <section className="order-note">
    //                <div className="note-wrap form-actions">
    //                  <textarea
    //                    autoComplete="off"
    //                    className="note hide"
    //                    name="note"
    //                    rows="5"
    //                    data-parsley-id="14"
    //                  ></textarea>
    //                  <a
    //                    className="toggle-note button secondary"
    //                    href="adfdasf"
    //                  >
    //                    + Add Note
    //                  </a>
    //                </div>
    //              </section>
    //            </div>
    //          </div>

    //          <div className="small-12 medium-6 large-6 columns c-actions mob-full-wid">
    //            <div className="checkout-actions">
    //              <h2>
    //                <span className="price-prefix">Subtotal</span>
    //                <span className="price">150</span>
    //              </h2>

    //              <div className="form-actions">
    //                <span className="cart-bottom-btn cart_button">
    //                  <input
    //                    type="submit"
    //                    className="button large"
    //                    name="checkout"
    //                    value="Proceed to Secure Checkout"
    //                  />
    //                </span>
    //              </div>
    //            </div>
    //          </div>
    //        </div>
    //      </form>

    //      <div
    //        className="recommendedProducts display-block"
    //        data-app="eastsideco_cartOffers"
    //        data-shop="allthatgrows-in.myshopify.com"
    //        data-money-format="₹ {{amount_no_decimals}}"
    //      >
    //        {/*<script id="cartData" type="application/json">[{"id":35696104515,"properties":{},"quantity":1,"variant_id":35696104515,"key":"35696104515:a15081309b57927754d59378b8090e44","title":"Radish White Microgreen Seeds","price":15000,"original_price":15000,"discounted_price":15000,"line_price":15000,"original_line_price":15000,"total_discount":0,"discounts":[],"sku":"MICRO101","grams":0,"vendor":"Microgreen Seeds","taxable":false,"product_id":9744538307,"product_has_only_default_variant":true,"gift_card":false,"final_price":15000,"final_line_price":15000,"url":"\/products\/radish-white-microgreens?variant=35696104515","featured_image":{"aspect_ratio":1.0,"alt":"Radish White Microgreen Seeds","height":600,"url":"https:\/\/cdn.shopify.com\/s\/files\/1\/1380\/2059\/products\/Radish-White.jpg?v=1598074857","width":600},"image":"https:\/\/cdn.shopify.com\/s\/files\/1\/1380\/2059\/products\/Radish-White.jpg?v=1598074857","handle":"radish-white-microgreens","requires_shipping":true,"product_type":"Seeds","product_title":"Radish White Microgreen Seeds","product_description":"Collect clean soil mixed with manure in a container and spread seeds on the soil surface. Cover the seeds with a thin layer of soil and water immediately to make the surface damp. Expose the plant to sunlight after 2 days of germination and water regularly. Harvest in around 10-12 days, can vary according to requirement.","variant_title":null,"variant_options":["Default Title"],"options_with_values":[{"name":"Title","value":"Default Title"}],"line_level_discount_allocations":[],"line_level_total_discount":0}]</script>*/}
    //      </div>
    //    </div>
    //  </div>
    //</Layout>
  );
};

export default CartPage;
