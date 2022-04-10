import axios from "axios";
import React from "react";

const SignIn = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    const data = {
      email: email.value,
      password: password.value,
    };
    var config = {
      method: "get",
      url: "http://localhost:8080/sign-in",
      data,
    };
    //https://jashan-dev-3.myshopify.com/account/activate/5726614323285/dbc64ed98720d5406bab664d3b09cdc6-1650619866    efbbe54ff58b70fb9f6a519ab45a68d5-1650621396
    axios(config)
      .then(function (response) {
        //console.log(response.data);
      })
      .catch(function (error) {
        //console.log(error.response.data.message);
      });
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
//curl -d '{"customer":{"first_name":"Steve","last_name":"Lastnameson","email":"steve.lastnameson@example.com","phone":"+15142546011","verified_email":true,"addresses":[{"address1":"123 Oak St","city":"Ottawa","province":"ON","phone":"555-1212","zip":"123 ABC","last_name":"Lastnameson","first_name":"Mother","country":"CA"}]}}' -X POST "https://allthatgrows-in.myshopify.com/admin/api/2022-01/customers.json" -H "X-Shopify-Access-Token: 0c13740ce701b2616bf9f719bb2ec23e" -H "Content-Type: application/json"
