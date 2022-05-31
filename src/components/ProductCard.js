import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import HeartLoading from "./HeartLoading";

const ProductCard = ({ id, title, url, variantId, price }) => {
  const { addItemToCart, isAdding } = useContext(ShopContext);
  return (
    <div className="product-card">
      <HeartLoading id={id} />
      <div className="card">
        <div className="card-image-div">
          <Link to={`/product/${id.substring(id.lastIndexOf("/") + 1)}`}>
            <img style={{ height: "140px" }} src={url} alt="img" />
            <p>{title}</p>
          </Link>
        </div>
        <div className="card-details-div">
          <p>₹ {price}</p>
          {isAdding === variantId ? (
            <button>ADDING</button>
          ) : (
            <button onClick={() => addItemToCart(variantId, 1)}>ADD</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
