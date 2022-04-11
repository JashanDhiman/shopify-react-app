import React from "react";

import axios from "axios";

const SignUp = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, lname, email, password } = e.target;
    const data = [
      {
        customer: {
          first_name: fname.value,
          last_name: lname.value,
          email: email.value,
          verified_email: true,
        },
      },
      password.value,
    ];
    var config = {
      method: "post",
      url: "http://localhost:8080/sign-up",
      data,
    };

    await axios(config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.response);
      });
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
