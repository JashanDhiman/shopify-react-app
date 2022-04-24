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
    removeItemToCart,
    updateItemToCart,
    isLoading,
  } = useContext(ShopContext);

  return (
    <div
      className="cart"
      style={{
        display: isCartOpen ? "block" : "none",
        transition: "all 0.3s ease-in-out",
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
          {cart.lineItems.edges.length < 1 ? (
            <p>Cart is Empty</p>
          ) : (
            <>
              <div
                style={{ overflow: "auto", height: "80vh", padding: "1rem" }}
              >
                {cart.lineItems.edges.map((node, index) => {
                  const id = node.node.id;
                  const title = node.node.title;
                  const quantity = node.node.quantity;
                  const image = node.node.variant.image.url;
                  const price = node.node.variant.priceV2.amount;
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
                        <p>₹ {price * quantity}</p>
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
                        <i
                          style={{ cursor: "pointer" }}
                          onClick={() => removeItemToCart(id)}
                        >
                          <AiFillDelete />
                        </i>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="checkout-div">
                <div>
                  <p>Sub-Total - {cart.lineItemsSubtotalPrice.amount}</p>
                </div>
                <a href={cart.webUrl}>
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
  //}
};
export default Cart;
