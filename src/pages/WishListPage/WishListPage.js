import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import { ShopContext } from "../../contexts/ShopContext";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";

const WishListPage = () => {
  const { addItemToCart, isAdding, wishList } = useContext(ShopContext);
  //const thePath = useLocation().pathname;
  /*eslint-disable */
  //useEffect(() => {
  //}, []);
  /*eslint-enable */
  return (
    <Layout showFooter={true} showHeader={true} showCart={true}>
      <div>
        <div className="products-head">
          <h2>My Wishlist</h2>
        </div>
        <div className="veg-cards">
          {wishList ? (
            wishList.map((node, index) => {
              const {
                id,
                title,
                featuredImage: { url },
              } = node;
              const variantId = node.variants.edges[0].node.id;
              const price = node.variants.edges[0].node.priceV2.amount;
              return (
                <div key={index} className="product-card">
                  <div className="likeedIcon">
                    <i className="icons">
                      {/*{liked ? <AiTwotoneHeart /> : <AiOutlineHeart />}*/}
                      <AiTwotoneHeart />
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

export default WishListPage;
