import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";

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
          <p>₹ {isProductById.priceRange.maxVariantPrice.amount}</p>
          {isAdding === variantId ? (
            <button>ADDING</button>
          ) : (
            <button onClick={() => addItemToCart(variantId, 1)}>ADD</button>
          )}
        </div>
      </div>
    );
  } else {
    return <h1>Product Id is not correct</h1>;
  }
};

export default ProductPage;
