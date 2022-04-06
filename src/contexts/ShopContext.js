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
  const [isAdding, setIsAdding] = useState(false);
  const [isProductId, setIsProductId] = useState(false);

  useEffect(() => {
    if (localStorage.checkoutId) {
      fetchCheckout(localStorage.checkoutId);
    } else {
      createCheckout();
    }
  }, []);
  const cartOpen = (val) => {
    setIsCartOpen(val);
  };
  const createCheckout = async () => {
    const checkOut = await client.checkout.create();
    localStorage.setItem("checkoutId", checkOut.id);
    await setCheckout(checkOut);
  };

  const fetchCheckout = async (checkoutId) => {
    await client.checkout.fetch(checkoutId).then((checkOut) => {
      setCheckout(checkOut);
    });
  };

  const fetchAll = async () => {
    await client.product.fetchAll().then((products) => {
      setProductsList(products);
    });
  };
  const fetchById = async (id) => {
    await client.product.fetch(id).then((product) => {
      setIsProductId(product);
    });
  };
  const addItemToCheckout = async (variantId, quantity) => {
    setIsAdding(variantId);
    setIsLoading(true);
    const lineItemsToAdd = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
      },
    ];
    await client.checkout
      .addLineItems(localStorage.checkoutId, lineItemsToAdd)
      .then((checkOut) => {
        setCheckout(checkOut);
        setIsLoading(false);
        setIsAdding(false);
      });
  };
  const updateItemToCheckout = async (id, quantity) => {
    const lineItemsToUpdate = [
      {
        id: id,
        quantity: parseInt(quantity, 10),
      },
    ];
    await client.checkout
      .updateLineItems(localStorage.checkoutId, lineItemsToUpdate)
      .then((checkOut) => {
        setCheckout(checkOut);
      });
  };
  const removeItemToCheckout = async (id) => {
    setIsLoading(true);
    const lineItemIdsToRemove = [id];
    await client.checkout
      .removeLineItems(localStorage.checkoutId, lineItemIdsToRemove)
      .then((checkOut) => {
        setCheckout(checkOut);
        setIsLoading(false);
      });
  };

  return (
    <ShopContext.Provider
      value={{
        isCartOpen,
        productsList,
        checkout,
        isLoading,
        isAdding,
        isProductId,
        fetchById,
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
