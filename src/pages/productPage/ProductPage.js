import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import StarRating from "../../components/StarRating";
import { ShopContext } from "../../contexts/ShopContext";
import "./productPage.css";

const ProductPage = () => {
  const { isProductById, fetchById, isAdding, addItemToCart, isLoading } =
    useContext(ShopContext);

  const thePath = useLocation().pathname;
  /*eslint-disable */
  useEffect(() => {
    let productId = thePath.substring(thePath.lastIndexOf("/") + 1);
    fetchById(productId);
  }, []);
  /*eslint-enable */
  const [productQuantity, setProductQuantity] = useState(1);
  if (isProductById) {
    isLoading && <Loading />;
    const {
      title,
      description,
      featuredImage: { url },
    } = isProductById;
    const { amount } = isProductById.priceRange.maxVariantPrice;
    const variantId = isProductById.variants.edges[0].node.id;
    const { title: seoTitle, description: seoDesc } = isProductById.seo;
    return (
      <Layout showFooter={true} showHeader={true} showCart={true}>
        <Helmet>
          <meta name="description" content={seoDesc} />
          <title>{seoTitle}</title>
        </Helmet>
        <div className="product-card">
          <div className="product-div">
            <div className="product-image-div block">
              <img src={url} alt="img" />
            </div>
            <div className="product-details-div block">
              <p className="productHead">{title}</p>
              <div>
                <StarRating rating={4.4} />
                <span> 2 Reviews</span>
              </div>
              <br></br>
              <div className="productPrice">
                <span>₹ {amount}</span>
                <span className="tax_info">Price Inclusive of All Taxes</span>
              </div>
              <div className="product-discount-wrapper">
                <span>Take 10% off your first order</span>
                Use code <span className="cc">HELLOATG</span>
              </div>
              <div className="selector-qty">
                <input
                  className="minus qty-btn cursor-pointer"
                  type="button"
                  defaultValue="-"
                  onClick={() =>
                    productQuantity > 1 &&
                    setProductQuantity(productQuantity - 1)
                  }
                />
                <input
                  data-max="99"
                  type="text"
                  name="updates[]"
                  readOnly
                  value={productQuantity}
                  className="qty_input"
                />
                <input
                  className="plus qty-btn cursor-pointer"
                  type="button"
                  defaultValue="+"
                  onClick={() => setProductQuantity(productQuantity + 1)}
                />
              </div>
              <div className="pro-qty">
                1 packet contains <span>600 seeds</span>
              </div>
              <div
                style={{
                  margin: "1.5rem 0",
                }}
              >
                {isAdding === variantId ? (
                  <button className="productBtn">ADDING</button>
                ) : (
                  <button
                    className="productBtn"
                    onClick={() =>
                      addItemToCart([
                        { merchandiseId: variantId, quantity: productQuantity },
                      ])
                    }
                  >
                    ADD
                  </button>
                )}
              </div>
              <div className="pro-qty">
                <span>Free Shipping</span> on orders above Rs 200 &amp; Get{" "}
                <span>2 Free Samples with every purchase</span>
                <br></br>Ships in <span>3 days</span>
              </div>
              <div className="body section product_spec hid-mob">
                <div className="product_desc_title">Specifications</div>
                <p>
                  <span>Seed Type : </span> Non-Hybrid, Open Pollinated and
                  Non-GMO
                </p>
                <p>
                  <span>SOWING TIME : </span> Throughout The Year
                </p>
                <p>
                  <span>PLANT CHARACTER : </span> Ball-shaped round plant
                </p>
                <p>
                  <span>LEAF CHARACTER : </span> Small aromatic leaves
                </p>
                <p>
                  <span>HARVEST : </span> 40 - 50 Days From Sowing
                </p>
              </div>
              <div>
                <span className="hv_a_que">Have a Question?</span>
              </div>
            </div>
          </div>
          <hr></hr>
          <div className="hid-mob" style={{ marginTop: "6rem" }}>
            <div className="prt-btm">
              <ul>
                <li className="" style={{ height: "160px" }}>
                  SOWING<br></br>TIME<span className="prt-st"></span>
                  <p className="prt-value">Throughout the year</p>
                </li>

                <li className="" style={{ height: "160px" }}>
                  Sowing<br></br>Distance<span className="prt-sd"></span>
                  <p className="prt-value">
                    Plant to Plant - 10-12 inches, Line to Line - 16-18 inches
                  </p>
                </li>

                <li className="hid-mob" style={{ height: "160px" }}>
                  Fruit<br></br>Weight<span className="prt-fw"></span>
                  <p className="prt-value">N/A</p>
                </li>

                <li className="hid-mob" style={{ height: "145px" }}>
                  Fruit<br></br>Shape<span className="prt-fs"></span>
                  <p className="prt-value">N/A</p>
                </li>

                <li className="" style={{ height: "145px" }}>
                  Days to <br></br>maturity<span className="prt-dm"></span>
                  <p className="prt-value">40 to 50 days</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="hid-mob">
            <div className="container-hid-mob">
              <div className="product-tab">
                <ul className="tabs">
                  <li className="tab-link current active">Details</li>
                  <li className="tab-link active">How to sow</li>
                  <li className="tab-link active">Reviews</li>
                </ul>
              </div>

              <div id="tab-1" className="tab-content current">
                <p className="active">{description}</p>
              </div>
            </div>
            <span className="product-disclaimer">
              <strong>Disclaimer:</strong>
              <p>
                The productiveness of any seed we sell is subject to your local
                climatic conditions*, the sowing method you adopt, and your
                commitment to the planting process. We give no warranty,
                expressed or implied, and are in no way responsible for the
                produce.
              </p>
              <p>
                Please note that all our seasonal recommendations/ sowing
                information is as per the local climatic conditions. *For more
                information on the optimum conditions required for growing seeds
                in your region, please contact us at, hello@allthatgrows.in or
                Whatsapp us at, +91 8544865077
              </p>
            </span>

            <div className="simpAsk-container desktop" id="simpAskQuestion">
              <div className="simpAsk-title-container">
                <h2>Questions &amp; Answers</h2>
              </div>
              <div className="simp-ask-question-header">
                <div className="simpAskQuestion-Qcontent">
                  <h3>Have a Question?</h3>
                  <p>Be the first to ask a question about this.</p>
                </div>
                <a href="#j" className="simpAskQuestionForm-btnOpen btn button">
                  <i className="demo-icon icon-simp-help-circled"></i> Ask a
                  Question
                </a>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  } else {
    return isLoading ? <Loading /> : <h1>Product Id is not correct</h1>;
  }
};

export default ProductPage;
