import React, { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/imageSlider.css";
import { Link } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import Loading from "./Loading";

const CollectionSlider = ({ data, settings }) => {
  const { addItemToCart, isAdding } = useContext(ShopContext);
  if (data) {
    return (
      <div className="slider">
        <Slider {...settings}>
          {data ? (
            data.map((node, index) => {
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
        </Slider>
      </div>
    );
  }
  return null;
};

export default CollectionSlider;
