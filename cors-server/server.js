const axios = require("axios");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Global Variables
var adminConfig = {
  method: "post",
  url: "https://jashan-dev-3.myshopify.com/admin/api/2022-04/graphql.json",
  headers: {
    "X-Shopify-Access-Token": process.env.REACT_APP_ADMIN_API_ACCESS_TOKEN,
    "Content-Type": "application/json",
  },
};
var storeFrontConfig = {
  method: "post",
  url: "https://jashan-dev-3.myshopify.com/api/2022-04/graphql.json",
  headers: {
    "X-Shopify-Storefront-Access-Token":
      process.env.REACT_APP_STOREFRONT_ACCESS_TOKEN,
    "Content-Type": "application/json",
  },
};
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
            namespace: "custom",
            key: "cart_id",
            value: req.body.cartId,
            type: "single_line_text_field",
          },
          {
            namespace: "custom",
            key: "wish_list",
            value: "Default_Parameter",
            type: "single_line_text_field",
          },
          {
            namespace: "custom",
            key: "save_for_later",
            value: "Default_Parameter",
            type: "single_line_text_field",
          },
          {
            namespace: "custom",
            key: "cart_save",
            value: "Default_Parameter",
            type: "single_line_text_field",
          },
        ],
      },
    },
  });

  var config = { ...adminConfig, data: data };

  axios(config)
    .then(function (response) {
      if (response.data.data.customerCreate.userErrors.length > 0) {
        res.status(400).send("Email has already been taken");
      } else {
        customer_Id = response.data.data.customerCreate.customer.id;
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

              var config = { ...storeFrontConfig, data: data };
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
                  console.log(error.response.data, "\nerror in ");
                });
            }
          })
          .catch((error) => {
            console.log(error.response.data, "\nerror in ");
          });
      }
    })
    .catch(function (error) {
      console.log(error.response.data, "\nerror in ");
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

  var config = { ...storeFrontConfig, data: data };

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
      console.log(error.response.data, "\nerror in ");
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

  var config = { ...storeFrontConfig, data: data };

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
      console.log(error.response.data, "\nerror in ");
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

  var config = { ...storeFrontConfig, data: data };

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
      console.log(error.response.data, "\nerror in ");
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
  var config = { ...storeFrontConfig, data: data };
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
      console.log(error.response.data, "\nerror in ");
    });
});
app.post("/getCustomerData", (req, res) => {
  var data = JSON.stringify({
    query: `{customer(customerAccessToken: "${req.body.accessToken.accessToken}") {id
        metafields(namespace: "custom", first: 20, reverse:true) {edges {node {id
              key
              value}}}}}`,
  });
  var config = { ...storeFrontConfig, data: data };
  axios(config)
    .then(function (response) {
      res.send(response.data.data.customer);
    })
    .catch(function (error) {
      console.log(error.response.data, "\nerror in ");
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
  var config = { ...storeFrontConfig, data: data };
  axios(config)
    .then(function (response) {
      res.send(response.data.data.products.edges);
    })
    .catch(function (error) {
      console.log(error.response.data, "\nerror in ");
    });
});
app.post("/product", (req, res) => {
  var data = JSON.stringify({
    query: `{product(id: "gid://shopify/Product/${req.body.id}") {
      	title
      	description
      	id
        seo{
          title
          description}
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
  var config = { ...storeFrontConfig, data: data };
  axios(config)
    .then(function (response) {
      res.send(response.data.data.product);
    })
    .catch(function (error) {
      console.log(error.response.data, "\nerror in ");
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
  var config = { ...storeFrontConfig, data: data };
  axios(config)
    .then(function (response) {
      res.send(response.data.data.collection.products.edges);
    })
    .catch(function (error) {
      console.log(error.response.data, "\nerror in ");
    });
});

//-----------------------------cart functions-----------
app.post("/updateUserCartId", (req, res) => {
  var data = JSON.stringify({
    query: `mutation {customerUpdate(input: {id: "${req.body.customerId}", metafields: [{id: "${req.body.metaFieldId}", value: "${req.body.cartId}"}]}) {
      userErrors {message}
      customer {id
        metafields(namespace: "custom", first: 20) {edges {node {id
              key
              value
              namespace}}}}}}`,
  });
  var config = { ...adminConfig, data: data };
  axios(config).then(
    function (response) {
      //console.log(response.data);
      //res.send(response.data.data.customer.metafield);
      response.data.data.customer.metafields.edges.map(({ node }) => {
        node.key == "cart_id" && res.send(node.value);
      });
    }.catch(function (error) {
      //console.log(error.response);
    })
  );
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
  var config = { ...storeFrontConfig, data: data };
  axios(config)
    .then(function (response) {
      if (response.data.data.cartCreate.userErrors.length > 0) {
        res.status(400).send(response.data.data.cartCreate.userErrors);
      } else {
        res.send(response.data.data.cartCreate.cart);
      }
    })
    .catch(function (error) {
      console.log(error.response.data, "\nerror in ");
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
          lines(first:250) {
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
                      id
                    }
                    priceV2 {
                      amount
                    }
                    image {
                      url
                    }}}}}}}}`,
  });
  var config = { ...storeFrontConfig, data: data };
  axios(config)
    .then(function (response) {
      res.send(response.data.data.cart);
    })
    .catch(function (error) {
      console.log(error.response.data, "\nerror in ");
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
                      id
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
  var config = { ...storeFrontConfig, data: data };
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
                      id
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
  var config = { ...storeFrontConfig, data: data };
  axios(config)
    .then(function (response) {
      if (response.data.data.cartLinesRemove.userErrors.length > 0) {
        res.status(400).send(response.data.data.cartLinesRemove.userErrors);
      } else {
        res.send(response.data.data.cartLinesRemove.cart);
      }
    })
    .catch(function (error) {
      console.log(error.response.data, "\nerror in ");
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
                      id
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
  var config = { ...storeFrontConfig, data: data };
  axios(config)
    .then(function (response) {
      if (response.data.data.cartLinesUpdate.userErrors.length > 0) {
        res.status(400).send(response.data.data.cartLinesUpdate.userErrors);
      } else {
        res.send(response.data.data.cartLinesUpdate.cart);
      }
    })
    .catch(function (error) {
      console.log(error.response.data, "\nerror in ");
    });
});

//----------------------------- Wish List functions-----------
app.post("/fetchWishList", (req, res) => {
  var data = JSON.stringify({
    query: `{customer(customerAccessToken:"${req.body.accessToken.accessToken}") {metafields(namespace: "custom",first: 50) {
      edges {node {id
            key
            value}}}}}`,
  });
  var config = { ...storeFrontConfig, data: data };
  axios(config)
    .then(function (response) {
      var wishlist;
      response.data.data.customer.metafields.edges.map(({ node }) => {
        node.key == "wish_list" &&
          (node.value == "Default_Parameter"
            ? res.send({ wishListIDs: [], wishList: [] })
            : (wishlist = node.value.split(",").filter(Boolean)));
      });
      if (wishlist) {
        var data = JSON.stringify({
          query: `query test($ids: [ID!]!) {
          nodes(ids: $ids) {
            ... on Product {id
              title
              featuredImage {url}
              variants(first: 1) {edges {node {id
                    priceV2 {amount}}}}}}}`,
          variables: {
            ids: wishlist,
          },
        });
        var config = { ...storeFrontConfig, data: data };
        axios(config)
          .then(function (response) {
            res.send({
              wishListIDs: wishlist,
              wishList: response.data.data.nodes,
            });
          })
          .catch(function (error) {
            console.log(error.response.data, "\nerror in fetchWishList 1");
          });
      }
    })
    .catch(function (error) {
      console.log(error.response.data, "\nerror in fetchWishList 2");
    });
});
app.post("/updateWishList", (req, res) => {
  //updatedList should be in comma sperated string format i.e gid://shopify/Product/6762631790677,gid://shopify/Product/6762631561301
  var data = JSON.stringify({
    query: `mutation {
      customerUpdate(input: {id: "${req.body.customerId}", metafields: [{id: "${req.body.metafieldId}", value: "${req.body.updatedList}"}]}) {
        userErrors {message}
        customer {id
          metafields(namespace: "custom", first: 20) {edges {node {id
                key
                value
                namespace}}}}}}`,
  });
  var config = { ...adminConfig, data: data };
  axios(config)
    .then(function (response) {
      //console.log(response.data.data.customerUpdate.customer);
    })
    .catch(function (error) {
      //console.log(error.response);
    });
  if (req.body.updatedList === "Default_Parameter") {
    res.send({
      wishListIDs: [],
      wishList: [],
    });
  } else {
    let wishlist = req.body.updatedList.split(",").filter(Boolean);
    var data = JSON.stringify({
      query: `query test($ids: [ID!]!) {
          nodes(ids: $ids) {
            ... on Product {id
              title
              featuredImage {url}
              variants(first: 1) {edges {node {id
                    priceV2 {amount}}}}}}}`,
      variables: {
        ids: wishlist,
      },
    });
    var config = { ...storeFrontConfig, data: data };
    axios(config)
      .then(function (response) {
        res.send({
          wishListIDs: wishlist,
          wishList: response.data.data.nodes,
        });
      })
      .catch(function (error) {
        console.log(error.response, "\nerror in add to wishlist");
      });
  }
});

//----------------------------- Product_Save_for_Later functions-----------
app.post("/fetchSaveForLater", (req, res) => {
  var data = JSON.stringify({
    query: `{customer(customerAccessToken:"${req.body.accessToken.accessToken}") {metafields(namespace: "custom",first: 50) {
      edges {node {id
            key
            value}}}}}`,
  });
  var config = { ...storeFrontConfig, data: data };
  axios(config)
    .then(function (response) {
      var productsList;
      response.data.data.customer.metafields.edges.map(({ node }) => {
        node.key == "save_for_later" &&
          (node.value == "Default_Parameter"
            ? res.send({ productsIDs: [], productsList: [] })
            : (productsList = node.value.split(",").filter(Boolean)));
      });
      if (productsList) {
        var data = JSON.stringify({
          query: `query test($ids: [ID!]!) {
          nodes(ids: $ids) {
            ... on Product {id
              title
              featuredImage {url}
              variants(first: 1) {edges {node {id
                    priceV2 {amount}}}}}}}`,
          variables: {
            ids: productsList,
          },
        });
        var config = { ...storeFrontConfig, data: data };
        axios(config)
          .then(function (response) {
            res.send({
              productsIDs: productsList,
              productsList: response.data.data.nodes,
            });
          })
          .catch(function (error) {
            console.log(error.response.data, "\nerror in fetchWishList 1");
          });
      }
    })
    .catch(function (error) {
      console.log(error.response.data, "\nerror in fetchWishList 2");
    });
});
app.post("/updateSaveForLater", (req, res) => {
  //updatedList should be in comma sperated string format i.e gid://shopify/Product/6762631790677,gid://shopify/Product/6762631561301
  var data = JSON.stringify({
    query: `mutation {customerUpdate(input: {id: "${req.body.customerId}", metafields: [{id: "${req.body.metafieldId}", value: "${req.body.updatedList}"}]}) {
        userErrors {message}
        customer {id
          metafields(namespace: "custom", first: 20) {edges {node {id
                key
                value
                namespace}}}}}}`,
  });
  var config = { ...adminConfig, data: data };
  axios(config)
    .then(function (response) {
      //console.log(response.data.data.customerUpdate.customer);
    })
    .catch(function (error) {
      //console.log(error.response);
    });
  if (req.body.updatedList === "Default_Parameter") {
    res.send({
      productsIDs: [],
      productsList: [],
    });
  } else {
    let productsList = req.body.updatedList.split(",").filter(Boolean);
    var data = JSON.stringify({
      query: `query test($ids: [ID!]!) {
          nodes(ids: $ids) {
            ... on Product {id
              title
              featuredImage {url}
              variants(first: 1) {edges {node {id
                    priceV2 {amount}}}}}}}`,
      variables: {
        ids: productsList,
      },
    });
    var config = { ...storeFrontConfig, data: data };
    axios(config)
      .then(function (response) {
        res.send({
          productsIDs: productsList,
          productsList: response.data.data.nodes,
        });
      })
      .catch(function (error) {
        console.log(error.response, "\nerror in add to wishlist");
      });
  }
});

//----------------------------- Cart_Save_for_Later functions-----------
app.post("/fetchSavedCart", (req, res) => {
  var data = JSON.stringify({
    query: `{customer(customerAccessToken:"${req.body.accessToken.accessToken}") {metafields(namespace: "custom",first: 50) {
      edges {node {id
            key
            value}}}}}`,
  });
  var config = { ...storeFrontConfig, data: data };
  axios(config)
    .then(function (response) {
      var productsList;
      response.data.data.customer.metafields.edges.map(({ node }) => {
        node.key == "cart_save" &&
          (node.value == "Default_Parameter"
            ? res.send({ productsIDs: [], productsList: [] })
            : (productsList = node.value.split(",").filter(Boolean)));
      });
      if (productsList) {
        var data = JSON.stringify({
          query: `query test($ids: [ID!]!) {
          nodes(ids: $ids) {
            ... on Product {id
              title
              featuredImage {url}
              variants(first: 1) {edges {node {id
                    priceV2 {amount}}}}}}}`,
          variables: {
            ids: productsList,
          },
        });
        var config = { ...storeFrontConfig, data: data };
        axios(config)
          .then(function (response) {
            res.send({
              productsIDs: productsList,
              productsList: response.data.data.nodes,
            });
          })
          .catch(function (error) {
            console.log(error.response.data, "\nerror in fetchWishList 1");
          });
      }
    })
    .catch(function (error) {
      console.log(error.response.data, "\nerror in fetchWishList 2");
    });
});
app.post("/updateSavedCart", (req, res) => {
  //updatedList should be in comma sperated string format i.e gid://shopify/Product/6762631790677,gid://shopify/Product/6762631561301
  var data = JSON.stringify({
    query: `mutation {customerUpdate(input: {id: "${req.body.customerId}", metafields: [{id: "${req.body.metafieldId}", value: "${req.body.updatedList}"}]}) {
        userErrors {message}
        customer {id
          metafields(namespace: "custom", first: 20) {edges {node {id
                key
                value
                namespace}}}}}}`,
  });
  var config = { ...adminConfig, data: data };
  axios(config)
    .then(function (response) {
      //console.log(response.data.data.customerUpdate.customer);
    })
    .catch(function (error) {
      //console.log(error.response);
    });
  if (req.body.updatedList === "Default_Parameter") {
    res.send({
      productsIDs: [],
      productsList: [],
    });
  } else {
    let productsList = req.body.updatedList.split(",").filter(Boolean);
    var data = JSON.stringify({
      query: `query test($ids: [ID!]!) {
          nodes(ids: $ids) {
            ... on Product {id
              title
              featuredImage {url}
              variants(first: 1) {edges {node {id
                    priceV2 {amount}}}}}}}`,
      variables: {
        ids: productsList,
      },
    });
    var config = { ...storeFrontConfig, data: data };
    axios(config)
      .then(function (response) {
        res.send({
          productsIDs: productsList,
          productsList: response.data.data.nodes,
        });
      })
      .catch(function (error) {
        console.log(error.response, "\nerror in add to wishlist");
      });
  }
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
              phone}}}
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
  var config = { ...storeFrontConfig, data: data };
  axios(config)
    .then(function (response) {
      res.send(response.data.data.customer);
    })
    .catch(function (error) {
      console.log(error.response.data, "\nerror in ");
    });
});
app.post("/update-profile", (req, res) => {
  var data = JSON.stringify({
    query: `mutation customerUpdate($customer: CustomerUpdateInput!, $customerAccessToken: String!) {
      customerUpdate(customer: $customer, customerAccessToken: $customerAccessToken) {
        customer {id
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
                phone}}}
          orders(first: 250) {
            edges {
              node {
                id
                name
                processedAt
                fulfillmentStatus
                financialStatus
                totalPriceV2 {
                  amount}
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
                          url}}}}}}}}}
        customerUserErrors {message}}}`,
    variables: {
      customer: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
      },
      customerAccessToken: req.body.accessToken,
    },
  });
  var config = { ...storeFrontConfig, data: data };
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
      console.log(error.response.data, "\nerror in ");
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
  var config = { ...storeFrontConfig, data: data };
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
      console.log(error.response.data, "\nerror in ");
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
  var config = { ...storeFrontConfig, data: data };
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
      console.log(error.response.data, "\nerror in ");
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
  var config = { ...storeFrontConfig, data: data };
  axios(config)
    .then(function (response) {
      res.send(response.data.data);
    })
    .catch(function (error) {
      console.log(error.response.data, "\nerror in ");
    });
});
app.listen(4000, (err) => {
  if (err) console.log(err, "\nerror in app.listen");
  console.log(`server is running at 4000`);
});
