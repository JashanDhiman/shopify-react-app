import React, { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { ImCross } from "react-icons/im";
import { AiFillDelete } from "react-icons/ai";
import Loading from "./Loading";

const Cart = () => {
  const {
    isCartOpen,
    cartOpen,
    checkout,
    removeItemToCheckout,
    updateItemToCheckout,
    isLoading,
  } = useContext(ShopContext);

  if (checkout) {
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
        <div>
          {checkout.lineItems.length < 1 ? (
            <p>Cart is Empty</p>
          ) : (
            <>
              <div
                style={{ overflow: "auto", height: "80vh", padding: "1rem" }}
              >
                {checkout.lineItems.map((product, index) => {
                  return (
                    <div key={index} className="product-card">
                      <div className="card-image-div">
                        <img
                          style={{ height: "100px" }}
                          src={product.variant.image.src}
                          alt="img"
                        />
                      </div>
                      <div className="card-details-div">
                        <p>{product.title}</p>
                        <p>₹ {product.variant.price * product.quantity}</p>
                        <p>
                          Qty :
                          <input
                            type="number"
                            min="0"
                            max="20"
                            value={product.quantity}
                            onChange={(e) =>
                              updateItemToCheckout(product.id, e.target.value)
                            }
                          />
                        </p>
                        <i
                          style={{ cursor: "pointer" }}
                          onClick={() => removeItemToCheckout(product.id)}
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
                  <p>Sub-Total - {checkout.lineItemsSubtotalPrice.amount}</p>
                </div>
                <a href={checkout.webUrl}>
                  <button>CHECK-OUT</button>
                </a>
              </div>
            </>
          )}
        </div>
        {isLoading && <Loading />}
      </div>
    );
  } else {
    return null;
  }
};
export default Cart;
