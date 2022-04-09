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
    <div>
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
        {productsList.map(({ title, id, images, variants }, index) => {
          return (
            <div key={index} className="product-card">
              <div className="card-image-div">
                <Link to={`/productpage/${title}`} state={id}>
                  <img
                    style={{ height: "140px" }}
                    src={images[0].src}
                    alt="img"
                  />
                  <p>{title}</p>
                </Link>
              </div>
              <div className="card-details-div">
                <p>₹ {variants[0].price}</p>
                {isAdding === variants[0].id ? (
                  <button>ADDING</button>
                ) : (
                  <button onClick={() => addItemToCheckout(variants[0].id, 1)}>
                    ADD
                  </button>
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
