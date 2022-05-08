import React, { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { ImCross } from "react-icons/im";
import { AiFillDelete } from "react-icons/ai";
import Loading from "./Loading";

const Cart = () => {
  const {
    isCartOpen,
    cartOpen,
    cart,
    removeItemFromCart,
    updateItemToCart,
    isLoading,
  } = useContext(ShopContext);
  return (
    <div
      className="cart"
      style={{
        display: isCartOpen ? "block" : "none",
        transition: "all 0.3s ease-in-out",
        zIndex: "10",
      }}
    >
      <div
        className="cart-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          height: "10vh",
        }}
      >
        <h1>CART</h1>
        <div onClick={() => cartOpen(false)}>
          <ImCross />
        </div>
      </div>
      {cart ? (
        <div>
          {cart.lines.edges.length < 1 ? (
            <p>Cart is Empty</p>
          ) : (
            <>
              <div
                style={{ overflow: "auto", height: "80vh", padding: "1rem" }}
              >
                {cart.lines.edges.map((node, index) => {
                  //const merchandiseId = node.node.merchandise.id;
                  const id = node.node.id;
                  const title = node.node.merchandise.product.title;
                  const quantity = node.node.quantity;
                  const image = node.node.merchandise.image.url;
                  const price = node.node.merchandise.priceV2.amount;
                  const totalPrice =
                    node.node.estimatedCost.subtotalAmount.amount;
                  return (
                    <div key={index} className="product-card">
                      <div className="card-image-div">
                        <img
                          style={{ height: "100px" }}
                          src={image}
                          alt="img"
                        />
                      </div>
                      <div className="card-details-div">
                        <p>{title}</p>
                        <p>₹ {price}</p>
                        <p>
                          Qty :
                          <input
                            type="number"
                            min="0"
                            max="20"
                            value={quantity}
                            onChange={(e) =>
                              updateItemToCart(id, e.target.value)
                            }
                          />
                        </p>
                        <p>₹ {totalPrice}</p>
                        <i
                          style={{ cursor: "pointer" }}
                          onClick={() => removeItemFromCart(id)}
                        >
                          <AiFillDelete />
                        </i>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="checkout-div">
                <p style={{ margin: "0" }}>
                  Sub-Total - {cart.estimatedCost.totalAmount.amount}
                </p>
                <a href={cart.checkoutUrl}>
                  <button>CHECK-OUT</button>
                </a>
              </div>
            </>
          )}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "70vh",
            textAlign: "center",
          }}
        >
          <h2>Put Something Inside Me.. Baby!</h2>
        </div>
      )}
      {isLoading && <Loading />}
    </div>
  );
};
export default Cart;
