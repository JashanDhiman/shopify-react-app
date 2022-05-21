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
//------------------------authentication, login-logout functions-----------

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
          message}
        customer {
          id
          email
          firstName
          lastName}}}`,
    variables: {
      input: {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        metafields: [
          {
            namespace: "instructions",
            key: "cartId",
            value: req.body.cartId,
            type: "single_line_text_field",
          },
        ],
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
              message}  }  }`,
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
                      metafield(key: "cartId", namespace: "instructions") {
                        id
                        value}
                    email}
                    customerAccessToken {
                      accessToken
                      expiresAt}
                    customerUserErrors {
                      message}  }  }`,
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
                  console.log(error.response.data);
                });
            }
          })
          .catch((error) => {
            console.log(error.response.data);
          });
      }
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
});
app.post("/signin", (req, res) => {
  var data = JSON.stringify({
    query: `mutation customerAccessTokenCreate(
          $input: CustomerAccessTokenCreateInput!
        ) {customerAccessTokenCreate(input: $input) {
            customerAccessToken {
              accessToken
              expiresAt}
            customerUserErrors {
              message}}}`,
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
      console.log(error.response.data);
    });
});
app.post("/tokenrenew", (req, res) => {
  var data = JSON.stringify({
    query: `mutation customerAccessTokenRenew($customerAccessToken: String!) {
      customerAccessTokenRenew(customerAccessToken: $customerAccessToken) {
        customerAccessToken {
          accessToken
          expiresAt}
        userErrors {
          field
          message}}}`,
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
      if (response.data.data.customerAccessTokenRenew.userErrors.length > 0) {
        res
          .status(400)
          .send(response.data.data.customerAccessTokenRenew.userErrors);
      } else {
        res.send(
          response.data.data.customerAccessTokenRenew.customerAccessToken
        );
      }
    })
    .catch(function (error) {
      console.log(error.response.data);
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
          message}}}`,
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
      console.log(error.response.data);
    });
});
app.post("/resetpass", (req, res) => {
  var data = JSON.stringify({
    query: `mutation customerRecover($email: String!) {
      customerRecover(email: $email) {
        customerUserErrors {
          message}}}`,
    variables: {
      email: req.body.email,
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
      if (response.data.data.customerRecover == null) {
        res.send("Limit exceeded! Please wait for 5 mins then try again");
      } else if (
        response.data.data.customerRecover.customerUserErrors.length < 1
      ) {
        res.send(
          "Successfully sent email!\nPlease check your email for further steps."
        );
      } else {
        res.status(400).send({
          message: "something wrong happend or email is not registered",
        });
      }
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
});

//-----------------------------product functions-----------

app.get("/products", (req, res) => {
  var data = JSON.stringify({
    query: ` {
      products(first: 10) {
        edges {
          node {
            id
            title
            featuredImage {
              url}
            variants(first: 1) {
              edges {
                node {
                  id
                  priceV2 {
                    amount
                  }}}}}}}}`,
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
      res.send(response.data.data.products.edges);
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
});
app.post("/product", (req, res) => {
  var data = JSON.stringify({
    query: ` {
    	product(id: "gid://shopify/Product/${req.body.id}") {
      	title
      	description
      	id
        variants(first:5){
          edges{
            node{
              id}}}
    		priceRange{
          maxVariantPrice{
            amount}}
    		featuredImage{
          url}}}`,
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
      res.send(response.data.data.product);
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
});
app.post("/collectionbyhandle", (req, res) => {
  var data = JSON.stringify({
    query: `{collection(handle: "${req.body.collectionhandle}") {
        title
        id
        products(first: 250) {
          edges {
            node {
              id
              title
              featuredImage {
                url}
              variants(first: 1) {
                edges {
                  node {
                    id
                    priceV2 {
                      amount}}}}}}}}}`,
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
      res.send(response.data.data.collection.products.edges);
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
});

//-----------------------------cart functions-----------

app.post("/fetchUserCartId", (req, res) => {
  var data = JSON.stringify({
    query: `{customer(customerAccessToken:"${req.body.accessToken.accessToken}") {id}}`,
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
      var data = JSON.stringify({
        query: `{customer(id:"${response.data.data.customer.id}") {
            metafield(key:"cartId",namespace:"instructions"){
              id
              value}}}`,
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
      axios(config).then(function (response) {
        res.send(response.data.data.customer.metafield);
      });
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
});
app.post("/updateUserCartId", (req, res) => {
  console.log(req.body);
  var data = JSON.stringify({
    query: `mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
          metafieldsSet(metafields: $metafields) {
            metafield(key: "cartId", namespace: "instructions") {
              id
              value
            }
            userErrors {
              field
              message
            }
          }
        }`,
    variables: {
      metafields: {
        ownerId: response.data.data.customer.metaFieldId,
        namespace: "instructions",
        value: req.body.cartId,
        key: "cartId",
        type: "single_line_text_field",
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
  axios(config).then(function (response) {
    res.send(response.data.data.customer.metafield);
  });
});
app.post("/createcart", (req, res) => {
  if (req.body.accessToken) {
    var data = JSON.stringify({
      query: `mutation cartCreate($input: CartInput) {
        cartCreate(input: $input) {
          cart {checkoutUrl
            id}
          userErrors {
            message}}} `,
      variables: {
        input: {
          buyerIdentity: {
            customerAccessToken: req.body.accessToken,
          },
        },
      },
    });
  } else {
    var data = JSON.stringify({
      query: `mutation cartCreate($input: CartInput) {
        cartCreate(input: $input) {
          cart {
            id}
          userErrors {
            message}}} `,
      variables: {
        input: {},
      },
    });
  }
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
      if (response.data.data.cartCreate.userErrors.length > 0) {
        res.status(400).send(response.data.data.cartCreate.userErrors);
      } else {
        res.send(response.data.data.cartCreate.cart);
      }
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
});
app.post("/fetchcart", (req, res) => {
  var data = JSON.stringify({
    query: `{cart(id:"${req.body.id}") {
          estimatedCost{
            totalAmount{
              amount}}
          id
          checkoutUrl
          lines(first:5) {
            edges {
              node {
                id
                estimatedCost{
                  subtotalAmount{
                    amount}}
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    sku
                    product {
                      title
                    }
                    priceV2 {
                      amount
                    }
                    image {
                      url
                    }}}}}}}}`,
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
      res.send(response.data.data.cart);
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
});
app.post("/addtocart", (req, res) => {
  var data = JSON.stringify({
    query: `mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          estimatedCost{
            totalAmount{
              amount}}
          id
          checkoutUrl
          lines(first:5) {
            edges {
              node {
                id
                estimatedCost{
                  subtotalAmount{
                    amount}}
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    product {
                      title}
                    priceV2 {
                      amount}
                    image {
                      url}}}}}}}
        userErrors {
          field
          message}}}`,
    variables: {
      cartId: req.body.cartId,
      lines: {
        quantity: req.body.quantity,
        merchandiseId: req.body.variantId,
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
    .then(function (response) {
      if (response.data.data.cartLinesAdd.userErrors.length > 0) {
        res.status(400).send(response.data.data.cartLinesAdd.userErrors);
      } else {
        res.send(response.data.data.cartLinesAdd.cart);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});
app.post("/removefromcart", (req, res) => {
  var data = JSON.stringify({
    query: `mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        userErrors{
          message}
        cart {
          estimatedCost {
            totalAmount {
              amount}}
          id
          checkoutUrl
          lines(first: 5) {
            edges {
              node {
                id
                estimatedCost {
                  subtotalAmount {
                    amount}}
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    product {
                      title}
                    priceV2 {
                      amount}
                    image {
                      url}}}}}}}}}`,
    variables: {
      cartId: req.body.cartId,
      lineIds: [req.body.merchandiseId],
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
      if (response.data.data.cartLinesRemove.userErrors.length > 0) {
        res.status(400).send(response.data.data.cartLinesRemove.userErrors);
      } else {
        res.send(response.data.data.cartLinesRemove.cart);
      }
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
});
app.post("/updatecart", (req, res) => {
  var data = JSON.stringify({
    query: `mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          estimatedCost {
            totalAmount {
              amount}}
          id
          checkoutUrl
          lines(first: 5) {
            edges {
              node {
                id
                estimatedCost {
                  subtotalAmount {
                    amount}}
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    product {
                      title}
                    priceV2 {
                      amount}
                    image {
                      url}}}}}}}
        userErrors {
          message}}}`,
    variables: {
      cartId: req.body.cartId,
      lines: {
        id: req.body.id,
        quantity: parseInt(req.body.quantity),
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
    .then(function (response) {
      if (response.data.data.cartLinesUpdate.userErrors.length > 0) {
        res.status(400).send(response.data.data.cartLinesUpdate.userErrors);
      } else {
        res.send(response.data.data.cartLinesUpdate.cart);
      }
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
});

//-------------------user profile, address and orders-------------

app.post("/profile", (req, res) => {
  var data = JSON.stringify({
    query: `{customer(customerAccessToken: "${req.body.accessToken}") {
        id
        firstName
        lastName
        email
        phone
        createdAt
        addresses(first:20) {
          edges {
            node {
              id
              address1
              zip
              city
              country
              countryCodeV2
              firstName
              lastName
              phone
            }
          }
        }
        orders(first:250, reverse: true){
          edges{
            node{
              id
              name
              processedAt
              fulfillmentStatus
              financialStatus
              totalPriceV2{
                amount
              }
              lineItems(first:250){
                edges{node{
                  title
                  originalTotalPrice{
                    amount
                  }
                  variant{
                    id
                    image{
                      url}}}}}}}}}}`,
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
      res.send(response.data.data.customer);
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
});
app.post("/update-profile", (req, res) => {
  var data = JSON.stringify({
    query: `mutation customerUpdate($customer: CustomerUpdateInput!, $customerAccessToken: String!) {
      customerUpdate(customer: $customer, customerAccessToken: $customerAccessToken) {
        customer {
          id
          firstName
          lastName
          email
          phone
          createdAt
          addresses(first: 20) {
            edges {
              node {
                id
                address1
                zip
                city
                country
                firstName
                lastName
                phone
              }
            }
          }
          orders(first: 250) {
            edges {
              node {
                id
                name
                processedAt
                fulfillmentStatus
                financialStatus
                totalPriceV2 {
                  amount
                }
                lineItems(first: 250) {
                  edges {
                    node {
                      title
                      originalTotalPrice {
                        amount
                      }
                      variant {
                        id
                        image {
                          url
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        customerUserErrors {
          message
        }
      }
    }
    
    `,
    variables: {
      customer: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
      },
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
      if (response.data.data.customerUpdate.customerUserErrors.length > 0) {
        res
          .status(400)
          .send(response.data.data.customerUpdate.customerUserErrors);
      } else {
        res.send(response.data.data.customerUpdate.customer);
      }
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
});
app.post("/add-address", (req, res) => {
  var data = JSON.stringify({
    query: `mutation customerAddressCreate($address: MailingAddressInput!, $customerAccessToken: String!) {
      customerAddressCreate(address: $address, customerAccessToken: $customerAccessToken) {
        customerAddress {
          id
          zip
          firstName
          lastName
          phone
          address1
          city
          country
        }
        customerUserErrors {
          message}}}`,
    variables: {
      address: {
        address1: req.body.address1,
        city: req.body.city,
        country: req.body.country,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        zip: req.body.zip,
      },
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
      if (
        response.data.data.customerAddressCreate.customerUserErrors.length > 0
      ) {
        res
          .status(400)
          .send(response.data.data.customerAddressCreate.customerUserErrors);
      } else {
        res.send(response.data.data.customerAddressCreate.customerAddress);
      }
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
});
app.post("/edit-address", (req, res) => {
  var data = JSON.stringify({
    query: `mutation customerAddressUpdate($address: MailingAddressInput!, $customerAccessToken: String!, $id: ID!) {
      customerAddressUpdate(address: $address, customerAccessToken: $customerAccessToken, id: $id) {
        customerAddress {
          id
          zip
          firstName
          lastName
          phone
          address1
          city
          country
        }
        customerUserErrors {
          message}}}`,
    variables: {
      address: {
        address1: req.body.address1,
        city: req.body.city,
        country: req.body.country,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        zip: req.body.zip,
      },
      customerAccessToken: req.body.accessToken,
      id: req.body.addressId,
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
        response.data.data.customerAddressUpdate.customerUserErrors.length > 0
      ) {
        res
          .status(400)
          .send(response.data.data.customerAddressUpdate.customerUserErrors);
      } else {
        res.send(response.data.data.customerAddressUpdate.customerAddress);
      }
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
});
app.post("/delete-address", (req, res) => {
  var data = JSON.stringify({
    query: `mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
      customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
        customerUserErrors {
          message
        }
        deletedCustomerAddressId
      }}`,
    variables: {
      customerAccessToken: req.body.accessToken,
      id: req.body.addressId,
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
      res.send(response.data.data);
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
});
app.listen(4000, (err) => {
  if (err) console.log(err);
  console.log(`server is running at 4000`);
});
