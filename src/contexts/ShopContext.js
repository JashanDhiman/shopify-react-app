import React, { useEffect, useState } from "react";
import Client from "shopify-buy";

const ShopContext = React.createContext();
const client = Client.buildClient({
  domain: "allthatgrows-in.myshopify.com",
  storefrontAccessToken: "0c13740ce701b2616bf9f719bb2ec23e",
});

const ShopProvider = ({ children }) => {
  const [productsList, setProductsList] = useState([]);
  const [checkout, setCheckout] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //addItemToCheckout();
    if (localStorage.checkoutId) {
      fetchCheckout(localStorage.checkoutId);
    } else {
      createCheckout();
    }
  }, []);
  const cartOpen = (val) => {
    setIsCartOpen(val);
  };
  async function createCheckout() {
    const checkOut = await client.checkout.create();
    localStorage.setItem("checkoutId", checkOut.id);
    await setCheckout({ checkOut });
  }

  async function fetchCheckout(checkoutId) {
    await client.checkout.fetch(checkoutId).then((checkOut) => {
      setCheckout({ checkOut });
    });
  }

  async function fetchAll() {
    await client.product.fetchAll().then((products) => {
      setProductsList(products);
    });
  }
  const addItemToCheckout = async (variantId, quantity) => {
    const lineItemsToAdd = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ];
    await client.checkout
      .addLineItems(localStorage.checkoutId, lineItemsToAdd)
      .then((checkOut) => {
        setCheckout({ checkOut });
      });
  };
  const updateItemToCheckout = async (variantId, quantity) => {
    const lineItemsToUpdate = [
      {
        id: variantId,
        quantity: parseInt(quantity, 10),
      },
    ];
    await client.checkout
      .updateLineItems(localStorage.checkoutId, lineItemsToUpdate)
      .then((checkOut) => {
        setCheckout({ checkOut });
      });
  };
  const removeItemToCheckout = async (variantId) => {
    const lineItemIdsToRemove = [variantId];
    await client.checkout
      .removeLineItems(localStorage.checkoutId, lineItemIdsToRemove)
      .then((checkOut) => {
        setCheckout({ checkOut });
      });
  };

  return (
    <ShopContext.Provider
      value={{
        isCartOpen,
        productsList,
        checkout,
        cartOpen,
        fetchAll,
        addItemToCheckout,
        removeItemToCheckout,
        updateItemToCheckout,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

const ShopConsumer = ShopContext.Consumer;
export { ShopConsumer, ShopContext };

export default ShopProvider;
