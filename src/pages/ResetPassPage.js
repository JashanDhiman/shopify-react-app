import axios from "axios";
import React from "react";

const ResetPassPage = () => {
  const domain = process.env.REACT_APP_DEPLOY_DOMAIN;
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.email.value);
    var config = {
      method: "post",
      url: `${domain}:4000/resetpass`,
      data: { email: e.target.email.value },
    };
    axios(config)
      .then((response) => {
        //console.log(response.data);
        alert(response.data);
      })
      .catch((error) => {
        alert(error.response.data[0].message);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <label htmlFor="email">Registered Email</label>
      <input id="email" type="text" />
      <br></br>
      <input type="submit" />
    </form>
  );
};

export default ResetPassPage;
