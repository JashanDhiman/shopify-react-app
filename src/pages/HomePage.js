import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
//import Cart from "../components/Cart";
import Loading from "../components/Loading";
//import Navbar from "../components/Navbar";
import { ShopContext } from "../contexts/ShopContext";

const HomePage = () => {
  const { productsList, addItemToCart, isAdding, fetchAll } =
    useContext(ShopContext);
  useEffect(() => {
    fetchAll();
  }, []);
  return (
    <div style={{ position: "absolute", height: "89%", overflow: "auto" }}>
      {/*<Navbar />*/}
      {/*<Cart />*/}
      <div className="custom-shape-divider-top-1653280505">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>

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
        {productsList ? (
          productsList.map((node, index) => {
            const title = node.node.title;
            const id = node.node.id;
            const variantId = node.node.variants.edges[0].node.id;
            const image = node.node.featuredImage.url;
            const price = node.node.variants.edges[0].node.priceV2.amount;
            return (
              <div key={index} className="product-card">
                <div className="card-image-div">
                  <Link
                    to={`/product/${id.substring(id.lastIndexOf("/") + 1)}`}
                  >
                    <img style={{ height: "140px" }} src={image} alt="img" />
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
            );
          })
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default HomePage;
