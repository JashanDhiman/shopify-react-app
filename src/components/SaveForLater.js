import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import HeartLoading from "./HeartLoading";
import Loading from "./Loading";

const SaveForLater = () => {
  const { saveForLater, updateSaveForLater } = useContext(ShopContext);
  return (
    <>
      <h2>Save For Later</h2>
      <div className="veg-cards">
        {saveForLater ? (
          saveForLater.map((node, index) => {
            const {
              id,
              title,
              featuredImage: { url },
            } = node;
            const variantId = node.variants.edges[0].node.id;
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
                    <button
                      onClick={() => updateSaveForLater(id, variantId, true)}
                    >
                      Move to Cart
                    </button>
                    <button
                      onClick={() => updateSaveForLater(id, false, false)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default SaveForLater;
