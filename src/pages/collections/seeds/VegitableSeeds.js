import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../../components/Layout";
import Loading from "../../../components/Loading";
import ProductCard from "../../../components/ProductCard";
import { ShopContext } from "../../../contexts/ShopContext";

const VegitableSeeds = () => {
  const { collection, collectionByHandle } = useContext(ShopContext);
  const thePath = useLocation().pathname;
  /*eslint-disable */
  useEffect(() => {
    let collectionhandle = thePath.substring(thePath.lastIndexOf("/") + 1);
    collectionByHandle(collectionhandle);
  }, []);
  /*eslint-enable */
  return (
    <Layout showFooter={true} showHeader={true} showCart={true}>
      <div>
        <div className="products-head">
          <h2>VEGETABLES</h2>
          <p style={{ width: "100%", margin: "auto", textAlign: "center" }}>
            A beautiful garden with fresh produce & fragrant foliage on your
            mind? Create your very own urban garden with our wide variety of
            high-quality heirloom seeds. Reap the benefits of home-grown
            goodness with your very own vegetables, fruits, herbs, edible
            flowers, microgreens, and flowers. From delicious meals made with
            home-grown ingredients to stunning flower decor, dazzle your friends
            and family every time they come over. Buy non-GMO, heirloom seeds
            online in India at AllThatGrows today.
          </p>
        </div>
        <div className="veg-cards">
          {collection ? (
            collection.map((node, index) => {
              const {
                id,
                title,
                featuredImage: { url },
              } = node.node;
              const variantId = node.node.variants.edges[0].node.id;
              const price = node.node.variants.edges[0].node.priceV2.amount;
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
      </div>
    </Layout>
  );
};

export default VegitableSeeds;
