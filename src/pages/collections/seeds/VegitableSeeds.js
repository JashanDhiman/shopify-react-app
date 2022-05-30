import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Layout from "../../../components/Layout";
import Loading from "../../../components/Loading";
import { ShopContext } from "../../../contexts/ShopContext";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";

const VegitableSeeds = () => {
  const {
    collection,
    addItemToCart,
    isAdding,
    collectionByHandle,
    wishListIDs,
    updateWishList,
  } = useContext(ShopContext);
  const thePath = useLocation().pathname;
  /*eslint-disable */
  useEffect(() => {
    let collectionhandle = thePath.substring(thePath.lastIndexOf("/") + 1);
    collectionByHandle(collectionhandle);
  }, []);
  /*eslint-enable */
  //var liked = true;
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
                <div key={index} className="product-card">
                  <div
                    className="likeedIcon"
                    onClick={() => {
                      wishListIDs.includes(id)
                        ? updateWishList(id, false)
                        : updateWishList(id, true);
                    }}
                  >
                    <i className="icons">
                      {wishListIDs.includes(id) ? (
                        <AiTwotoneHeart />
                      ) : (
                        <AiOutlineHeart />
                      )}
                    </i>
                  </div>
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
                      {isAdding === variantId ? (
                        <button>ADDING</button>
                      ) : (
                        <button onClick={() => addItemToCart(variantId, 1)}>
                          ADD
                        </button>
                      )}
                    </div>
                  </div>
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
