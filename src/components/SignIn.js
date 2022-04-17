import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";

const SignIn = () => {
  let navigate = useNavigate();
  const { setAccessToken, accessToken } = useContext(ShopContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    const userVariables = {
      email: email.value,
      password: password.value,
    };

    const makeQuery = async () => {
      var config = {
        method: "post",
        url: "http://localhost:4000/signin",
        data: userVariables,
      };
      await axios(config)
        .then((response) => {
          setAccessToken(response.data);
          navigate(`/${response.data.accessToken}/homepage`);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    };
    makeQuery();
  };

  return (
    <>
      <div>SignIn</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required />
        </div>
        <input type="submit" />
      </form>
    </>
  );
};

export default SignIn;
