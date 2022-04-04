import React, { useContext, useEffect } from "react";
import Cart from "../components/Cart";
import Navbar from "../components/Navbar";
import { ShopContext } from "../contexts/ShopContext";

const HomePage = () => {
  const {
    productsList,
    addItemToCheckout,
    //removeItemToCheckout,
    //checkout,
    fetchAll,
  } = useContext(ShopContext);
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);
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
        {productsList.map((product, index) => {
          return (
            <div key={index} className="product-card">
              <div className="card-image-div">
                <img
                  style={{ height: "140px" }}
                  src={product.images[0].src}
                  alt="img"
                />
                <p>{product.title}</p>
              </div>
              <div className="card-details-div">
                <p>₹ {product.variants[0].price}</p>
                <button
                  onClick={() => addItemToCheckout(product.variants[0].id, 1)}
                >
                  ADD
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
