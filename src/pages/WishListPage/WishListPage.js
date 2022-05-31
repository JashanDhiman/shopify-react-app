import React, { useContext } from "react";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import { ShopContext } from "../../contexts/ShopContext";
import ProductCard from "../../components/ProductCard";

const WishListPage = () => {
  const { wishList } = useContext(ShopContext);
  //const thePath = useLocation().pathname;
  /*eslint-disable */
  //useEffect(() => {
  //}, []);
  /*eslint-enable */
  return (
    <Layout showFooter={true} showHeader={true} showCart={true}>
      <div>
        <div className="products-head">
          {wishList && wishList.length < 1 ? (
            <h2>You have nothing in your wishlist yet.</h2>
          ) : (
            <h2>My Wishlist</h2>
          )}
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

export default WishListPage;
