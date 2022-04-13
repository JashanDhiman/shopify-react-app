import axios from "axios";
import React from "react";

const SignIn = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    const gql = String.raw;
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
      const data = await axios(config).then(function (response) {
        console.log(response);
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
