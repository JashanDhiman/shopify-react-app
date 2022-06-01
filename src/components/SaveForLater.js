import React from "react";
import { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import Loading from "./Loading";
import ProductCard from "./ProductCard";

const SaveForLater = () => {
  const { saveForLater } = useContext(ShopContext);
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
              <div key={index}>
                <ProductCard
                  id={id}
                  title={title}
                  url={url}
                  variantId={variantId}
                  price={price}
                />
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
