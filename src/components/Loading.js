import React from "react";
import loader from "../images/loader.svg";

const Loading = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        height: "100vh",
        zIndex: "10",
        width: "100%",
        background: "black",
        opacity: "0.7",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="loader">
        <img src={loader} style={{ width: "3rem" }} alt="loading-img" />
      </div>
    </div>
  );
};

export default Loading;
