const axios = require("axios");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes

app.post("/create-customer", (req, res) => {
  if (req.body) {
    var config = {
      method: "post",
      url: "https://jashan-dev-3.myshopify.com/admin/api/2022-04/customers.json",
      headers: {
        "X-Shopify-Access-Token": "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",
        "Content-Type": "application/json",
      },
      data: req.body,
    };
    axios(config)
      .then((response) => {
        //console.log(response.data);
        res.send("Successfully Signed-Up");
      })
      .catch((error) => {
        res.status(400).send({
          message: "Error: Please fill valid email id and phone no!",
        });
        //console.log(error.response);
      });
  }
});
//app.post("/create-customer1", async (req, res) => {
//  console.log("start");
//  var config = {
//    method: "post",
//    url: "https://jashan-dev-3.myshopify.com/admin/api/2022-04/customers.json",
//    headers: {
//      "X-Shopify-Access-Token": "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",
//      "Content-Type": "application/json",
//    },
//    data: customer,
//  };
//  axios(config)
//    .then(function (response) {
//      console.log(JSON.stringify(response.data));
//      console.log("data");
//    })
//    .catch(function (error) {
//      console.log(error.response);
//      console.log("error");
//    });
//});

// listening

app.listen(8080, (err) => {
  if (err) console.log(err);
  console.log(`server is running at 8080`);
});
