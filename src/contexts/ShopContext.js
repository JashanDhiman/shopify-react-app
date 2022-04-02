import React, { useEffect, useState } from "react";
import Client from "shopify-buy";

const ShopContext = React.createContext();
const client = Client.buildClient({
  domain: "allthatgrows-in.myshopify.com",
  storefrontAccessToken: "0c13740ce701b2616bf9f719bb2ec23e",
});

const ShopProvider = ({ children }) => {
  const [productsList, setProductsList] = useState([]);

  client.checkout.create().then((checkout) => {
    console.log(checkout);
  });

  async function fetchAll() {
    await client.product.fetchAll().then((products) => {
      setProductsList(products);
    });
  }

  return (
    <ShopContext.Provider value={{ productsList, fetchAll }}>
      {children}
    </ShopContext.Provider>
  );
};

const ShopConsumer = ShopContext.Consumer;
export { ShopConsumer, ShopContext };

export default ShopProvider;
