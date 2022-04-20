import React, { memo, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Cart from "../components/Cart";
import Navbar from "../components/Navbar";
import { ShopContext } from "../contexts/ShopContext";

const HomePage = () => {
  const { productsList, addItemToCheckout, isAdding, fetchAll } =
    useContext(ShopContext);
  useEffect(() => {
    fetchAll();
  }, []);
  if (!productsList) return <p>loading</p>;
  return (
    <div style={{ position: "absolute", height: "100%", overflow: "auto" }}>
      <Navbar />
      <Cart />
      <div className="products-head">
        <h2>SEEDS</h2>
        <p>
          A beautiful garden with fresh produce & fragrant foliage on your mind?
          Create your very own urban garden with our wide variety of
          high-quality heirloom seeds. Reap the benefits of home-grown goodness
          with your very own vegetables, fruits, herbs, edible flowers,
          microgreens, and flowers. From delicious meals made with home-grown
          ingredients to stunning flower decor, dazzle your friends and family
          every time they come over. Buy non-GMO, heirloom seeds online in India
          at AllThatGrows today.
        </p>
      </div>
      <div className="veg-cards">
        {productsList.map((node, index) => {
          const title = node.node.title;
          const id = node.node.id;
          const image = node.node.featuredImage.url;
          const price = node.node.priceRangeV2.maxVariantPrice.amount;
          return (
            <div key={index} className="product-card">
              <div className="card-image-div">
                <Link
                  to={`/productpage/${id.substring(id.lastIndexOf("/") + 1)}`}
                >
                  <img style={{ height: "140px" }} src={image} alt="img" />
                  <p>{title}</p>
                  {/*<p>{id}</p>*/}
                </Link>
              </div>
              <div className="card-details-div">
                <p>₹ {price}</p>
                {isAdding === id ? (
                  <button>ADDING</button>
                ) : (
                  <button onClick={() => addItemToCheckout(id, 1)}>ADD</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(HomePage);
