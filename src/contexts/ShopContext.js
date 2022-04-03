import React, { useEffect, useState } from "react";
import Client from "shopify-buy";

const ShopContext = React.createContext();
const client = Client.buildClient({
  domain: "allthatgrows-in.myshopify.com",
  storefrontAccessToken: "0c13740ce701b2616bf9f719bb2ec23e",
});

const ShopProvider = ({ children }) => {
  const [productsList, setProductsList] = useState([]);
  const [checkout, setCheckout] = useState([]);

  //useEffect(() => {
  //  //addItemToCheckout();
  //  if (localStorage.checkout) {
  //    fetchCheckout(localStorage.checkout);
  //  } else {
  //    createCheckout();
  //  }
  //}, []);
  //async function createCheckout() {
  //  const checkout = await client.checkout.create();
  //  localStorage.setItem("checkout", checkout.id);
  //  await setCheckout({ checkout: checkout });
  //}
  client.checkout.create().then((checkout) => {
    console.log(checkout);
  });
  //async function fetchCheckout(checkoutId) {
  //  client.checkout
  //    .fetch(checkoutId)
  //    .then((checkout) => {
  //      setCheckout({ checkout: checkout });
  //    })
  //    .catch((err) => console.log(err));
  //}

  async function fetchAll() {
    await client.product.fetchAll().then((products) => {
      setProductsList(products);
    });
  }
  //const addItemToCheckout = async (variantId, quantity) => {
  //  console.log(variantId, quantity);
  //  const lineItemsToAdd = [
  //    {
  //      variantId: variantId,
  //      quantity: parseInt(quantity, 10),
  //    },
  //  ];
  //  await client.checkout
  //    .addLineItems(variantId, lineItemsToAdd)
  //    .then((checkout) => {
  //      // Do something with the updated checkout
  //      console.log(checkout); // Array with one additional line item
  //    });
  //};

  return (
    <ShopContext.Provider value={{ productsList, fetchAll }}>
      {children}
    </ShopContext.Provider>
  );
};

const ShopConsumer = ShopContext.Consumer;
export { ShopConsumer, ShopContext };

export default ShopProvider;
