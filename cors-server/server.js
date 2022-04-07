const axios = require("axios");
const express = require("express");
const app = express();
// routes

app.get("/create-customer", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.send({ msg: "This has CORS enabled 🎈" });
  console.log(res);
  //var data = JSON.stringify({
  //  customer: {
  //    first_name: "jas1",
  //    last_name: "dhiman",
  //    email: "jas2.lastnmeson@example.com",
  //    phone: "+19142565013",
  //    verified_email: true,
  //    addresses: [
  //      {
  //        address1: "123 Oak St",
  //        city: "Ottawa",
  //        province: "ON",
  //        phone: "555-1212",
  //        zip: "123 ABC",
  //        last_name: "Lastnameson",
  //        first_name: "Mother",
  //        country: "CA",
  //      },
  //    ],
  //  },
  //});

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
  res.send("Successfully created");
});

// listening

app.listen(8080, (err) => {
  if (err) console.log(err);
  console.log(`server is running at 8080`);
});
