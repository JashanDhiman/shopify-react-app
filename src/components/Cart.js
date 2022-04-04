import React, { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { ImCross } from "react-icons/im";

const Cart = () => {
  const {
    isCartOpen,
    cartOpen,
    checkout,
    removeItemToCheckout,
    updateItemToCheckout,
  } = useContext(ShopContext);
  if (checkout.checkOut) {
    return (
      <div className="cart" style={{ width: isCartOpen ? "20vw" : "0vw" }}>
        <div
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
        <div style={{ overflow: "auto", height: "90vh" }}>
          {checkout.checkOut.lineItems.length < 1 ? (
            <p>Cart is Empty</p>
          ) : (
            checkout.checkOut.lineItems.map((product, index) => {
              return (
                <div key={index} className="product-card">
                  <div className="card-image-div">
                    <img
                      style={{ height: "140px" }}
                      src={product.variant.image.src}
                      alt="img"
                    />
                    <p>{product.title}</p>
                  </div>
                  <div className="card-details-div">
                    <p>₹ {product.variant.price}</p>
                    <p>
                      Qty :
                      <input
                        type="number"
                        min="0"
                        max="10"
                        defaultValue={product.quantity}
                        onChange={(e) =>
                          updateItemToCheckout(product.id, e.target.value)
                        }
                      />
                    </p>
                    <button onClick={() => removeItemToCheckout(product.id)}>
                      REMOVE
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
};
export default Cart;
