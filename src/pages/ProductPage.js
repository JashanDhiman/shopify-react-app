import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";

const ProductPage = () => {
  const { isProductById, fetchById, isAdding, addItemToCheckout } =
    useContext(ShopContext);

  const thePath = useLocation().pathname;
  useEffect(() => {
    let productId = thePath.substring(thePath.lastIndexOf("/") + 1);
    fetchById(productId);
  }, []);
  //console.log(isAdding);
  if (isProductById) {
    return (
      <div className="product-card">
        <div className="card-image-div">
          <img
            style={{ height: "140px" }}
            src={isProductById.featuredImage.url}
            alt="img"
          />
          <p>{isProductById.title}</p>
          <p>{isProductById.description}</p>
        </div>
        <div className="card-details-div">
          <p>₹ {isProductById.priceRangeV2.maxVariantPrice.amount}</p>
          {/*{isAdding === isProductById.id ? (
            <button>ADDING</button>
          ) : (
            <button
              onClick={() => addItemToCheckout(isProductById.variants[0].id, 1)}
            >
              ADD
            </button>
          )}*/}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ProductPage;
