import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import HeartLoading from "./HeartLoading";
import Loading from "./Loading";
const CartSave = () => {
  const { savedCart, moveSavedCart } = useContext(ShopContext);
  return (
    <>
      <h2>Saved Cart</h2>
      <div className="veg-cards">
        {savedCart ? (
          savedCart.map((node, index) => {
            const {
              id,
              title,
              featuredImage: { url },
            } = node;
            //const variantId = node.variants.edges[0].node.id;
            const price = node.variants.edges[0].node.priceV2.amount;
            return (
              <div className="product-card" key={index}>
                <HeartLoading id={id} />
                <div className="card">
                  <div className="card-image-div">
                    <Link
                      to={`/product/${id.substring(id.lastIndexOf("/") + 1)}`}
                    >
                      <img style={{ height: "140px" }} src={url} alt="img" />
                      <p>{title}</p>
                    </Link>
                  </div>
                  <div className="card-details-div">
                    <p>₹ {price}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <Loading />
        )}
      </div>
      <button onClick={() => moveSavedCart()}>Move to cart</button>
    </>
  );
};

export default CartSave;
