import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import Client from "shopify-buy";

const ShopContext = React.createContext();
//const client = Client.buildClient({
//  domain: "allthatgrows-in.myshopify.com",
//  storefrontAccessToken: "0c13740ce701b2616bf9f719bb2ec23e",
//});

const ShopProvider = ({ children }) => {
  let navigate = useNavigate();
  const [productsList, setProductsList] = useState([]);
  //const [checkout, setCheckout] = useState("");
  //const [isCartOpen, setIsCartOpen] = useState(false);
  //const [isLoading, setIsLoading] = useState(false);
  //const [isAdding, setIsAdding] = useState(false);
  const [isProductById, setIsProductById] = useState(false);
  const [accessToken, setAccessToken] = useState(false);

  //useEffect(() => {
  //  if (localStorage.checkoutId) {
  //    fetchCheckout(localStorage.checkoutId);
  //  } else {
  //    createCheckout();
  //  }
  //}, []);
  //const cartOpen = (val) => {
  //  setIsCartOpen(val);
  //};
  //const createCheckout = async () => {
  //  const checkOut = await client.checkout.create();
  //  localStorage.setItem("checkoutId", checkOut.id);
  //  await setCheckout(checkOut);
  //};

  //const fetchCheckout = async (checkoutId) => {
  //  await client.checkout.fetch(checkoutId).then((checkOut) => {
  //    setCheckout(checkOut);
  //  });
  //};

  const fetchAll = () => {
    var config = {
      method: "get",
      url: "http://localhost:4000/products",
    };
    axios(config).then((response) => {
      setProductsList(response.data);
    });
  };
  const fetchById = (id) => {
    var config = {
      method: "post",
      url: "http://localhost:4000/product",
      data: { id },
    };
    axios(config).then((response) => {
      setIsProductById(response.data);
    });
  };
  //const fetchAll = async () => {
  //  await client.product.fetchAll().then((products) => {
  //    setProductsList(products);
  //  });
  //};
  //const fetchById = async (id) => {
  //  await client.product.fetch(id).then((product) => {
  //    setIsProductById(product);
  //  });
  //};
  //const addItemToCheckout = async (variantId, quantity) => {
  //  setIsAdding(variantId);
  //  setIsLoading(true);
  //  const lineItemsToAdd = [
  //    {
  //      variantId,
  //      quantity: parseInt(quantity, 10),
  //    },
  //  ];
  //  await client.checkout
  //    .addLineItems(localStorage.checkoutId, lineItemsToAdd)
  //    .then((checkOut) => {
  //      setCheckout(checkOut);
  //      setIsLoading(false);
  //      setIsAdding(false);
  //    });
  //};
  //const updateItemToCheckout = async (id, quantity) => {
  //  const lineItemsToUpdate = [
  //    {
  //      id: id,
  //      quantity: parseInt(quantity, 10),
  //    },
  //  ];
  //  await client.checkout
  //    .updateLineItems(localStorage.checkoutId, lineItemsToUpdate)
  //    .then((checkOut) => {
  //      setCheckout(checkOut);
  //    });
  //};
  //const removeItemToCheckout = async (id) => {
  //  setIsLoading(true);
  //  const lineItemIdsToRemove = [id];
  //  await client.checkout
  //    .removeLineItems(localStorage.checkoutId, lineItemIdsToRemove)
  //    .then((checkOut) => {
  //      setCheckout(checkOut);
  //      setIsLoading(false);
  //    });
  //};

  const handleSignout = async () => {
    var config = {
      method: "post",
      url: "http://localhost:4000/signout",
      data: accessToken,
    };
    await axios(config)
      .then((response) => {
        console.log(response.data);
        setAccessToken(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <ShopContext.Provider
      value={{
        //isCartOpen,
        productsList,
        //checkout,
        //isLoading,
        //isAdding,
        isProductById,
        accessToken,
        fetchById,
        //cartOpen,
        fetchAll,
        //addItemToCheckout,
        //removeItemToCheckout,
        //updateItemToCheckout,
        setAccessToken,
        handleSignout,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

const ShopConsumer = ShopContext.Consumer;
export { ShopConsumer, ShopContext };

export default ShopProvider;
