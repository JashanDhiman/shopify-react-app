import React, { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { ImCross } from "react-icons/im";
import { AiFillDelete } from "react-icons/ai";
import Loading from "./Loading";
import "../styles/homepage.css";

const Cart = () => {
  const {
    isCartOpen,
    cartOpen,
    cart,
    removeItemFromCart,
    updateItemToCart,
    isLoading,
  } = useContext(ShopContext);
  const cartStyle = {
    position: "fixed",
    top: "0%",
    right: "0%",
    height: "100vh",
    minWidth: "300px",
    width: "20vw",
    backgroundColor: "#fff",
    borderLeft: "2px solid black",
    color: "#205b4b",
    transition: "all 0.3s ease-in-out",
    zIndex: "10",
    display: isCartOpen ? "block" : "none",
  };
  const cartHeaderStyle = {
    boxShadow: "0px 0px 20px 3px rgba(32, 91, 75, 0.2)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    height: "10vh",
  };
  const checkoutDivStyle = {
    position: "static",
    bottom: "0%",
    height: "10vh",
    display: "grid",
    textAlign: "center",
    backgroundColor: "#fff",
    fontSize: "1.5rem",
    fontWeight: "600",
    padding: "0.3rem",
  };
  const checkoutDivButtonStyle = {
    fontSize: "1rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
    outline: "0",
    borderRadius: "10px",
    lineHeight: "2rem",
    padding: "0 30px",
    color: "#fff",
    border: "0",
    cursor: "pointer",
    background: "#205b4b",
    textDecoration: "none",
  };
  const productcardStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    overflow: "hidden",
    borderBottom: "1px solid #205b4b",
    padding: "1rem 0",
  };

  return (
    <div style={cartStyle}>
      <div style={cartHeaderStyle}>
        <h1>CART</h1>
        <div onClick={() => cartOpen(false)} style={{ cursor: "pointer" }}>
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
                  const { id, quantity } = node.node;
                  const {
                    product: { title },
                    image: { url },
                    priceV2: { amount },
                  } = node.node.merchandise;
                  const totalPrice =
                    node.node.estimatedCost.subtotalAmount.amount;
                  return (
                    <div key={index} style={productcardStyle}>
                      <div className="card-image-div">
                        <img style={{ height: "100px" }} src={url} alt="img" />
                      </div>
                      <div className="card-details-div">
                        <p>{title}</p>
                        <p>₹ {amount}</p>
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
              <div style={checkoutDivStyle}>
                <p style={{ margin: "0" }}>
                  Sub-Total - {cart.estimatedCost.totalAmount.amount}
                </p>
                <a href={cart.checkoutUrl}>
                  <button style={checkoutDivButtonStyle}>CHECK-OUT</button>
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
