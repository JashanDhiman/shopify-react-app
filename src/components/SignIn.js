import axios from "axios";
import React, { useEffect } from "react";

const SignIn = () => {
  const makeAPICall = async () => {
    const data = {
      customer: {
        first_name: "jas8",
        last_name: "dhiman",
        email: "jas8.lastnmeson@example.com",
        phone: "+19142565019",
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
    };
    var config = {
      method: "post",
      url: "http://localhost:8080/create-customer",
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
  useEffect(() => {
    makeAPICall();
  }, []);
  console.log("crate");
  //----------------------------------------------------------------------------------
  return <div>SignIn</div>;
};

export default SignIn;
//curl -d '{"customer":{"first_name":"Steve","last_name":"Lastnameson","email":"steve.lastnameson@example.com","phone":"+15142546011","verified_email":true,"addresses":[{"address1":"123 Oak St","city":"Ottawa","province":"ON","phone":"555-1212","zip":"123 ABC","last_name":"Lastnameson","first_name":"Mother","country":"CA"}]}}' -X POST "https://allthatgrows-in.myshopify.com/admin/api/2022-01/customers.json" -H "X-Shopify-Access-Token: 0c13740ce701b2616bf9f719bb2ec23e" -H "Content-Type: application/json"
