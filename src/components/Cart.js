import React, { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";

const Cart = () => {
  const { isCartOpen } = useContext(ShopContext);

  //console.log(checkout, "checkout");
  const addToCart = (product) => {
    console.log(product);
  };
  return (
    <div className="cart" style={{ width: isCartOpen ? "20vw" : "0vw" }}>
      <div>
        <h1>CART</h1>
      </div>
      <div></div>
    </div>
  );
};

export default Cart;

//{checkout &&
//  checkout.map((product, index) => {
//    return (
//      <div key={index} className="product-card">
//        <div className="card-image-div">
//          <img
//            style={{ height: "140px" }}
//            src={product.images[0].src}
//            alt="img"
//          />
//          <p>{product.title}</p>
//        </div>
//        <div className="card-details-div">
//          <p>₹ {product.variants[0].price}</p>
//          {/*<p>{product}</p>*/}
//          <button onClick={() => addToCart(product)}>REMOVE</button>
//        </div>
//      </div>
//    );
//  })}
