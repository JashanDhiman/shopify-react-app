const axios = require("axios");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// routes

app.post("/signup", (req, res) => {
  let customer_Id, activationToken;
  let password = req.body.password;
  const extractToken = (thePath) => {
    activationToken = thePath.substring(thePath.lastIndexOf("/") + 1);
  };
  var data = JSON.stringify({
    query: `mutation customerCreate($input: CustomerInput!) {
      customerCreate(input: $input) {
        userErrors {
          field
          message
        }
        customer {
          id
          email
          firstName
          lastName
        }
      }
    }`,
    variables: {
      input: {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
    },
  });

  var config = {
    method: "post",
    url: "https://jashan-dev-3.myshopify.com/admin/api/2022-04/graphql.json",
    headers: {
      "X-Shopify-Access-Token": process.env.REACT_APP_ADMIN_API_ACCESS_TOKEN,
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      //console.log(response.data.data.customerCreate);
      if (response.data.data.customerCreate.userErrors.length > 0) {
        res.status(400).send("Email has already been taken");
      } else {
        customer_Id = response.data.data.customerCreate.customer.id;
        //console.log(customer_Id);
        var data = JSON.stringify({
          query: `mutation customerGenerateAccountActivationUrl($customerId: ID!) {
          customerGenerateAccountActivationUrl(customerId: $customerId) {
            accountActivationUrl
            userErrors {
              field
              message
            }  }  }`,
          variables: {
            customerId: customer_Id,
          },
        });

        var config = {
          method: "post",
          url: "https://jashan-dev-3.myshopify.com/admin/api/2022-04/graphql.json",
          headers: {
            "X-Shopify-Access-Token":
              process.env.REACT_APP_ADMIN_API_ACCESS_TOKEN,
            "Content-Type": "application/json",
          },
          data: data,
        };
        axios(config)
          .then((response) => {
            //console.log(
            //  response.data.data.customerGenerateAccountActivationUrl
            //    .accountActivationUrl
            //);
            extractToken(
              response.data.data.customerGenerateAccountActivationUrl
                .accountActivationUrl
            );

            if (
              response.data.data.customerGenerateAccountActivationUrl.userErrors
                .length > 0
            ) {
              res
                .status(400)
                .send(
                  response.data.data.customerGenerateAccountActivationUrl
                    .userErrors
                );
            } else {
              var data = JSON.stringify({
                query: `mutation customerActivate($id: ID!, $input: CustomerActivateInput!) {
                  customerActivate(id: $id, input: $input) {
                    customer {
                    email
                    }
                    customerAccessToken {
                      accessToken
                      expiresAt
                    }
                    customerUserErrors {
                      message
                    }  }  }
                `,
                variables: {
                  id: customer_Id,
                  input: {
                    activationToken: activationToken,
                    password: password,
                  },
                },
              });

              var config = {
                method: "post",
                url: "https://jashan-dev-3.myshopify.com/api/2022-04/graphql.json",
                headers: {
                  "X-Shopify-Storefront-Access-Token":
                    process.env.REACT_APP_STOREFRONT_ACCESS_TOKEN,
                  "Content-Type": "application/json",
                },
                data: data,
              };
              axios(config)
                .then((response) => {
                  //console.log(response.data.data);
                  if (
                    response.data.data.customerActivate.customerUserErrors
                      .length > 0
                  ) {
                    res
                      .status(400)
                      .send(
                        response.data.data.customerActivate.customerUserErrors
                      );
                  } else {
                    res.send(
                      response.data.data.customerActivate.customerAccessToken
                    );
                  }
                })
                .catch((error) => {
                  //console.log(error);
                });
            }
          })
          .catch((error) => {
            //console.log(error);
          });
      }
    })
    .catch(function (error) {
      //console.log(error);
    });
});
app.post("/signin", (req, res) => {
  var data = JSON.stringify({
    query: `mutation customerAccessTokenCreate(
          $input: CustomerAccessTokenCreateInput!
        ) {
          customerAccessTokenCreate(input: $input) {
            customerAccessToken {
              accessToken
              expiresAt
            }
            customerUserErrors {
              message
            }
          }
        }`,
    variables: {
      input: { email: req.body.email, password: req.body.password },
    },
  });

  var config = {
    method: "post",
    url: "https://jashan-dev-3.myshopify.com/api/2022-04/graphql.json",
    headers: {
      "X-Shopify-Storefront-Access-Token":
        process.env.REACT_APP_STOREFRONT_ACCESS_TOKEN,
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      if (
        response.data.data.customerAccessTokenCreate.customerUserErrors.length
      ) {
        res.status(400).send({
          message: "username and password is not valid",
        });
      } else {
        res.send(
          response.data.data.customerAccessTokenCreate.customerAccessToken
        );
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});
app.post("/signout", (req, res) => {
  var data = JSON.stringify({
    query: `mutation customerAccessTokenDelete($customerAccessToken: String!) {
      customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
        deletedAccessToken
        deletedCustomerAccessTokenId
        userErrors {
          field
          message
        }
      }
    }
  `,
    variables: {
      customerAccessToken: req.body.accessToken,
    },
  });

  var config = {
    method: "post",
    url: "https://jashan-dev-3.myshopify.com/api/2022-04/graphql.json",
    headers: {
      "X-Shopify-Storefront-Access-Token":
        process.env.REACT_APP_STOREFRONT_ACCESS_TOKEN,
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      if (response.data.data.customerAccessTokenDelete) {
        res.send("Successfully Signed-out");
      } else {
        res.status(400).send({
          message: "something wrong happend or user already signed-out",
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});
app.get("/products", (req, res) => {
  var data = JSON.stringify({
    query: ` {
      products(first: 10) {
        edges {
          node {
            id
            title
            featuredImage{
              url
            }
            priceRangeV2{
              maxVariantPrice{
                amount
              }
            }
          }
        }
      }
    }
      
  `,
  });

  var config = {
    method: "post",
    url: "https://jashan-dev-3.myshopify.com/admin/api/2022-04/graphql.json",
    headers: {
      "X-Shopify-Access-Token": process.env.REACT_APP_ADMIN_API_ACCESS_TOKEN,
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      res.send(response.data.data.products.edges);
    })
    .catch(function (error) {
      console.log(error);
    });
});
app.post("/product", (req, res) => {
  var data = JSON.stringify({
    query: ` {
    	product(id: "gid://shopify/Product/${req.body.id}") {
      	title
      	description
      	id
    		priceRangeV2{
          maxVariantPrice{
            amount
          }
        }
    		featuredImage{
          url
        }
  	  }
    }
  `,
  });

  var config = {
    method: "post",
    url: "https://jashan-dev-3.myshopify.com/admin/api/2022-04/graphql.json",
    headers: {
      "X-Shopify-Access-Token": process.env.REACT_APP_ADMIN_API_ACCESS_TOKEN,
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      res.send(response.data.data.product);
    })
    .catch(function (error) {
      console.log(error);
    });
});
//app.post("/sign-up", (req, res) => {
//  let password = req.body[1];
//  if (req.body) {
//    var config = {
//      method: "post",
//      url: "https://jashan-dev-3.myshopify.com/admin/api/2022-04/customers.json",
//      headers: {
//        "X-Shopify-Access-Token": process.env.REACT_APP_ADMIN_API_ACCESS_TOKEN,
//        "Content-Type": "application/json",
//      },
//      data: req.body[0],
//    };
//    //-----------------------------------------------------------------------------------------------

//    axios(config)
//      .then((response) => {
//        customerId = response.data.customer.id;
//        //console.log(response.data.customer.id);
//        var config1 = {
//          method: "post",
//          url: `https://jashan-dev-3.myshopify.com/admin/api/2022-04/customers/${customerId}/account_activation_url.json`,
//          headers: {
//            "X-Shopify-Access-Token": process.env.REACT_APP_ADMIN_API_ACCESS_TOKEN,
//            "Content-Type": "application/json",
//          },
//        };
//        //-----------------------------------------------------------------------------------------------

//        axios(config1).then((response) => {
//          console.log(response.data.account_activation_url);
//          const account_activation_urlToken = getAccountActivationUrl(
//            response.data.account_activation_url
//          );
//          //console.log(account_activation_urlToken);

//          //-----------------------------------------------------------------------------------------------
//          let formBody = new FormData();
//          formBody.append("form_type", "activate_customer_password");
//          formBody.append("utf8", "✓");
//          formBody.append("customer[password]", password);
//          formBody.append("customer[password_confirmation]", password);
//          formBody.append("token", account_activation_urlToken);
//          formBody.append("id", customerId);
//          var config = {
//            method: "post",
//            url: `https://jashan-dev-3.myshopify.com/admin/api/2022-04/customers/${customerId}/activate_account.json`,
//            data: formBody,
//          };
//          axios(config)
//            .then((response) => {
//              //console.log(response.data);
//              res.send("Successfully Signed-Up");
//            })
//            .catch((error) => {
//              //console.log(error);
//            });
//        });
//      })
//      .catch((error) => {
//        res.status(400).send({
//          message: error.response.data.errors,
//        });
//        //console.log(error.response.data.errors);
//      });
//  }
//});
//app.post("/activateUrl", (req, res) => {
//  console.log(customerId);
//  var config = {
//    method: "post",
//    url: `https://jashan-dev-3.myshopify.com/admin/api/2022-04/customers/${customerId}/account_activation_url.json`,
//    headers: {
//      "X-Shopify-Access-Token": process.env.REACT_APP_ADMIN_API_ACCESS_TOKEN,
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
//        "X-Shopify-Access-Token": process.env.REACT_APP_ADMIN_API_ACCESS_TOKEN,
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
//        "X-Shopify-Access-Token": process.env.REACT_APP_ADMIN_API_ACCESS_TOKEN,
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
//      "X-Shopify-Access-Token": process.env.REACT_APP_ADMIN_API_ACCESS_TOKEN,
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

app.listen(4000, (err) => {
  if (err) console.log(err);
  console.log(`server is running at 8080`);
});
