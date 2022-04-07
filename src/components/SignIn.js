import axios from "axios";
import React, { useEffect } from "react";

const SignIn = () => {
  var data = JSON.stringify({
    customer: {
      first_name: "jas1",
      last_name: "dhiman",
      email: "jas2.lastnmeson@example.com",
      phone: "+19142565013",
      verified_email: true,
      addresses: [
        {
          address1: "123 Oak St",
          city: "Ottawa",
          province: "ON",
          phone: "555-1212",
          zip: "123 ABC",
          last_name: "Lastnameson",
          first_name: "Mother",
          country: "CA",
        },
      ],
    },
  });

  //var config = {
  //  method: "post",
  //  url: "https://jashan-dev-3.myshopify.com/admin/api/2022-04/customers.json",
  //  headers: {
  //    "X-Shopify-Access-Token": "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",
  //    "Content-Type": "application/json",
  //  },
  //  data: data,
  //};

  //axios(config)
  //  .then(function (response) {
  //    console.log(JSON.stringify(response.data));
  //    console.log("data");
  //  })
  //  .catch(function (error) {
  //    console.log(error.response);
  //    console.log("error");
  //  });

  //----------------------------------------------------------------------------------
  const makeAPICall = async () => {
    try {
      const response = await fetch("http://localhost:8080/create-customer", {
        mode: "cors",
      });
      const data = await response.json();
      console.log({ data });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    makeAPICall();
  }, []);

  //----------------------------------------------------------------------------------
  return <div>SignIn</div>;
};

export default SignIn;
//curl -d '{"customer":{"first_name":"Steve","last_name":"Lastnameson","email":"steve.lastnameson@example.com","phone":"+15142546011","verified_email":true,"addresses":[{"address1":"123 Oak St","city":"Ottawa","province":"ON","phone":"555-1212","zip":"123 ABC","last_name":"Lastnameson","first_name":"Mother","country":"CA"}]}}' -X POST "https://allthatgrows-in.myshopify.com/admin/api/2022-01/customers.json" -H "X-Shopify-Access-Token: 0c13740ce701b2616bf9f719bb2ec23e" -H "Content-Type: application/json"
