import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./registerPage.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const RegisterPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("ATG_AccessToken")) {
      navigate("/homepage");
    }
  }, []);

  let container;
  setTimeout(() => {
    container = document.getElementById("container");
    container.classList.add("sign-in");
  }, 50);
  const handleToggle = () => {
    container.classList.toggle("sign-in");
    container.classList.toggle("sign-up");
  };
  return (
    <div id="container" className={`container`}>
      <div className="row">
        <SignUp fun={handleToggle} />
        <SignIn fun={handleToggle} />
      </div>
      <div className="row content-row">
        <div className="col align-items-center flex-col">
          <div className="text sign-in">
            <h2>Welcome</h2>
          </div>
          <div className="img sign-in"></div>
        </div>
        <div className="col align-items-center flex-col">
          <div className="img sign-up"></div>
          <div className="text sign-up">
            <h2>Join with us</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
