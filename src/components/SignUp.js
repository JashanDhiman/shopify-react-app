import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, lname, email, password } = e.target;
    const userVariables = {
      email: email.value,
      password: password.value,
      lastName: lname.value,
      firstName: fname.value,
    };

    const makeQuery = async () => {
      var config = {
        method: "post",
        url: "http://localhost:4000/signup",
        data: userVariables,
      };
      await axios(config)
        .then((response) => {
          //console.log(response.data);
          navigate("/signin");
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    };
    makeQuery();
  };

  return (
    <>
      <div>Sign-Up</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fname">First Name</label>
          <input type="text" id="fname" required />
        </div>
        <div>
          <label htmlFor="lname">Last Name</label>
          <input type="text" id="lname" required />
        </div>
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
export default SignUp;
