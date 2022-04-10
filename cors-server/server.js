const axios = require("axios");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var customerId, account_activation_url;
// routes

app.post("/sign-up", (req, res) => {
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
        customerId = response.data.customer.id;
        console.log(response.data.customer.id);
        var config1 = {
          method: "post",
          url: `https://jashan-dev-3.myshopify.com/admin/api/2022-04/customers/${customerId}/account_activation_url.json`,
          headers: {
            "X-Shopify-Access-Token": "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",
            "Content-Type": "application/json",
          },
        };
        axios(config1).then((response) => {
          console.log(response.data.account_activation_url);
          //accountActivateUrl = response
          res.send("Successfully Signed-Up");
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: error.response.data.errors,
        });
        console.log(error.response.data.errors);
      });
  }
});
//app.post("/activateUrl", (req, res) => {
//  console.log(customerId);
//  var config = {
//    method: "post",
//    url: `https://jashan-dev-3.myshopify.com/admin/api/2022-04/customers/${customerId}/account_activation_url.json`,
//    headers: {
//      "X-Shopify-Access-Token": "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",
//      "Content-Type": "application/json",
//    },
//  };
//  axios(config)
//    .then((response) => {
//      console.log(response);
//      //accountActivateUrl = response
//    })
//    .catch((error) => {
//      //res.status(400).send({
//      //  message: error,
//      //});
//      //console.log(error.response.data.errors);
//    });
//  //res.redirect("/account-activate");
//});
//app.post("/account-activate", (req, res) => {
//  let formBody = FormData();
//  formBody.append(form_type, "activate_customer_password");
//  formBody.append(utf8, '✓');
//  formBody.append(customer[password], password);
//  formBody.append(customer[password_confirmation], password);
//  formBody.append(token, token);
//  formBody.append(id, customerId);
//  if (req.body) {
//    var config = {
//      method: "post",
//      url: `https://jashan-dev-3.myshopify.com/account/activate`,
//      headers: {
//        "X-Shopify-Access-Token": "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",
//        "Content-Type": "application/json",
//      },
//      data: formBody,
//    };
//    axios(config)
//      .then((response) => {
//        console.log(response.data);
//        //res.send("Successfully Signed-Up");
//        res.redirect("/account-activate");
//      })
//      .catch((error) => {
//        res.status(400).send({
//          message: error.response.data.errors,
//        });
//        //console.log(error.response.data.errors);
//      });
//  }
//});

//app.post("/sign-in", (req, res) => {
//  console.log(req.body);
//  if (req.body) {
//    var config = {
//      method: "get",
//      url: `https://jashan-dev-3.myshopify.com/account/login`,
//      headers: {
//        "X-Shopify-Access-Token": "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",
//      },
//      data: req.body,
//    };
//    axios(config)
//      .then((response) => {
//        console.log(response.data);
//        res.send("Successfully Signed-Up");
//      })
//      .catch((error) => {
//        res.status(400).send({
//          message: error.response.data.errors,
//        });
//        console.log(error.response.data.errors);
//      });
//  }
//});
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
