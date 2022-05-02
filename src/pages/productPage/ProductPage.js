import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { ShopContext } from "../../contexts/ShopContext";
import "./productPage.css";

const ProductPage = () => {
  const { isProductById, fetchById, isAdding, addItemToCart } =
    useContext(ShopContext);

  const thePath = useLocation().pathname;
  useEffect(() => {
    let productId = thePath.substring(thePath.lastIndexOf("/") + 1);
    fetchById(productId);
  }, []);

  if (isProductById) {
    const variantId = isProductById.variants.edges[0].node.id;
    return (
      <>
        {/*<Navbar />*/}
        <div className="product-card">
          <div className="product-div">
            <div className="product-image-div block">
              <img src={isProductById.featuredImage.url} alt="img" />
            </div>
            <div className="product-details-div block">
              <p className="productHead">{isProductById.title}</p>
              <p className="productDesc">{isProductById.description}</p>
              <p className="productPrice">
                ₹ {isProductById.priceRange.maxVariantPrice.amount}
              </p>
              {isAdding === variantId ? (
                <button className="productBtn">ADDING</button>
              ) : (
                <button
                  className="productBtn"
                  onClick={() => addItemToCart(variantId, 1)}
                >
                  ADD
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <h1>Product Id is not correct</h1>;
  }
};

export default ProductPage;
