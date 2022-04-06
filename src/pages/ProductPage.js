import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";

const ProductPage = () => {
  const { isProductId, fetchById, isAdding, addItemToCheckout } =
    useContext(ShopContext);
  const state = useLocation().state;
  useEffect(() => {
    fetchById(state);
  }, []);
  if (isProductId) {
    return (
      <div className="product-card">
        <div className="card-image-div">
          <img
            style={{ height: "140px" }}
            src={isProductId.images[0].src}
            alt="img"
          />
          <p>{isProductId.title}</p>
          <p>{isProductId.description}</p>
        </div>
        <div className="card-details-div">
          <p>₹ {isProductId.variants[0].price}</p>
          {isAdding === isProductId.variants[0].id ? (
            <button>ADDING</button>
          ) : (
            <button
              onClick={() => addItemToCheckout(isProductId.variants[0].id, 1)}
            >
              ADD
            </button>
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ProductPage;
