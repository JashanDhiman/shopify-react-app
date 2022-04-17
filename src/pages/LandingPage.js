import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const firstDiv = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };
  const secondDiv = {
    display: "flex",
    width: "100%",
    fontSize: "2rem",
    justifyContent: "space-evenly",
  };
  return (
    <div style={firstDiv}>
      <div style={secondDiv}>
        <Link to="/signin">Sign-In</Link>
        <Link to="/signup">Sign-Up</Link>
      </div>
    </div>
  );
};

export default LandingPage;
