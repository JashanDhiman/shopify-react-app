import React from "react";
import loader from "../images/loader.svg";

const Loading = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
      }}
    >
      <div className="loader">
        <img src={loader} style={{ width: "3rem" }} alt="loading-img" />
      </div>
    </div>
  );
};

export default Loading;
