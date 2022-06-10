import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
//import { useWindowSize } from "../Hooks/CustomHooks";

const ShopContext = React.createContext();

const ShopProvider = ({ children }) => {
  const [productsList, setProductsList] = useState(false);
  const [wishList, setWishList] = useState(false);
  const [wishListIDs, setWishListIDs] = useState([]);
  const [saveForLater, setSaveForLater] = useState(false);
  const [saveForLaterIDs, setSaveForLaterIDs] = useState([]);
  const [savedCart, setSavedCart] = useState(false);
  const [savedCartIDs, setSavedCartIDs] = useState([]);
  const [editShow, setEditShow] = useState(false);
  const [editAddressData, setEditAddressData] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] = useState(false);
  const [cartId, setCartId] = useState(false);
  const [isUserProfile, setIsUserProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isProductById, setIsProductById] = useState(false);
  const [accessToken, setAccessToken] = useState(false);
  const [collection, setCollection] = useState(false);
  const [heartLoading, setHeartLoading] = useState(false);
  const updateCartId = useRef(false);
  const customerId = useRef(false);
  const customerMetafields = useRef(false);
  const wishlistMetaID = useRef(false);
  const saveForLaterMetaID = useRef(false);
  const savedCartMetaID = useRef(false);
  const cartMetaID = useRef(false);
  const isMobile = useRef(false);
  const domain = process.env.REACT_APP_DEPLOY_DOMAIN;
  /*eslint-disable */
  useEffect(() => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      width < 720 && (isMobile.current = true);
    }
    if (localStorage.ATG_AccessToken) {
      getCustomerData();
      fetchWishList();
      //fetchSaveForLater();
      fetchSavedCart();
      const today = new Date(Date.now());
      const myDate = new Date(
        JSON.parse(localStorage.ATG_AccessToken).expiresAt
      );
      const result = myDate.getTime();
      if (result - today > 120000) {
        tokenRenew(JSON.parse(localStorage.ATG_AccessToken));
      } else {
        localStorage.removeItem("ATG_AccessToken");
        localStorage.removeItem("ATG_CartId");
      }
    }
    if (localStorage.ATG_CartId) {
      fetchCart();
    } else {
      createCart();
    }
  }, []);
  /*eslint-enable */

  //-----------------------------User Related Functions-----------------------
  const signIn = async (userVariables) => {
    var config = {
      method: "post",
      url: `${domain}:4000/signin`,
      data: userVariables,
    };
    await axios(config)
      .then((response) => {
        setAccessToken(response.data);
        //console.log(response.data);
        //navigate(`/${response.data.accessToken}/homepage`);
        localStorage.setItem("ATG_AccessToken", JSON.stringify(response.data));
        navigate(`/homepage`);
        getCustomerData();
        //createUserCart();
      })
      .catch((error) => {
        //console.log(error.response.data.message);
        alert(error.response.data.message);
      });
  };
  const signUp = async (userVariables) => {
    userVariables = { ...userVariables, cartId: cartId };
    var config = {
      method: "post",
      url: `${domain}:4000/signup`,
      data: userVariables,
    };
    await axios(config)
      .then((response) => {
        setAccessToken(response.data);
        localStorage.setItem("ATG_AccessToken", JSON.stringify(response.data));
        localStorage.setItem("ATG_CartId", JSON.stringify(cartId));
        navigate(`/homepage`);
        getCustomerData();
        //createUserCart();
        //navigate(`/${response.data.accessToken}/homepage`);
      })
      .catch((error) => {
        console.log(error.response.data);
        alert(error.response.data);
      });
  };
  const tokenRenew = async (token) => {
    var config = {
      method: "post",
      url: `${domain}:4000/tokenrenew`,
      data: token,
    };
    await axios(config)
      .then((response) => {
        setAccessToken(response.data);
        localStorage.setItem("ATG_AccessToken", JSON.stringify(response.data));
      })
      .catch((error) => {
        navigate(`/`);
        localStorage.removeItem("ATG_AccessToken");
        localStorage.removeItem("ATG_CartId");
        //console.log(error.response.data.message);
      });
  };
  const signOut = async () => {
    var config = {
      method: "post",
      url: `${domain}:4000/signout`,
      data: accessToken,
    };
    await axios(config)
      .then((response) => {
        console.log(response.data);
        setAccessToken(false);
        setCart(false);
        setCartId(false);
        navigate("/register");
        localStorage.removeItem("ATG_AccessToken");
        localStorage.removeItem("ATG_CartId");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  const userProfile = async () => {
    var config = {
      method: "post",
      url: `${domain}:4000/profile`,
      data: JSON.parse(localStorage.getItem("ATG_AccessToken")),
    };
    await axios(config)
      .then((response) => {
        setIsUserProfile(response.data);
      })
      .catch((error) => {
        navigate(`/`);
        //console.log(error.response.data.message);
      });
  };
  const updateProfile = async (data) => {
    var config = {
      method: "post",
      url: `${domain}:4000/update-profile`,
      data,
    };
    await axios(config)
      .then((response) => {
        setEditShow(false);
        console.log(response.data);
        setIsUserProfile(response.data);
      })
      .catch((error) => {
        alert(error.response.data[0].message);
      });
  };
  const createAddress = async (data) => {
    data = { ...data, accessToken: accessToken.accessToken };
    var config = {
      method: "post",
      url: `${domain}:4000/add-address`,
      data,
    };
    await axios(config)
      .then((response) => {
        userProfile();
        setShowAddress(false);
      })
      .catch((error) => {
        alert(error.response.data[0].message);
      });
  };
  const editAddress = async (data) => {
    data = { ...data, accessToken: accessToken.accessToken };
    var config = {
      method: "post",
      url: `${domain}:4000/edit-address`,
      data,
    };
    await axios(config)
      .then((response) => {
        userProfile();
        setEditAddressData(false);
      })
      .catch((error) => {
        alert(error.response.data[0].message);
      });
  };
  const deleteAddress = async (id) => {
    setIsLoading(true);
    var config = {
      method: "post",
      url: `${domain}:4000/delete-address`,
      data: { addressId: id, accessToken: accessToken.accessToken },
    };
    await axios(config)
      .then((response) => {
        userProfile();
        setIsLoading(false);
      })
      .catch((error) => {
        alert(error.response.data[0].message);
      });
  };
  //all metafields data will get from here and also set all variables value here if it is comming from customer metafields
  const getCustomerData = async () => {
    var config = {
      method: "post",
      url: `${domain}:4000/getCustomerData`,
      data: { accessToken: JSON.parse(localStorage.ATG_AccessToken) },
    };
    await axios(config)
      .then((response) => {
        customerId.current = response.data.id;
        customerMetafields.current = response.data.metafields.edges;
        response.data.metafields.edges.map(({ node }) => {
          if (node.key === "wish_list") {
            setWishListIDs(node.value.split(",").filter(Boolean));
            wishlistMetaID.current = node.id;
          }
          if (node.key === "save_for_later") {
            setSaveForLaterIDs(node.value.split(",").filter(Boolean));
            saveForLaterMetaID.current = node.id;
          }
          if (node.key === "cart_id") {
            localStorage.setItem("ATG_CartId", JSON.stringify(node.value));
            setCartId(node.value);
            cartMetaID.current = node.id;
            fetchCart();
          }
          if (node.key === "cart_save") {
            setSavedCartIDs(node.value.split(",").filter(Boolean));
            savedCartMetaID.current = node.id;
          }
          return null;
        });
      })
      .catch((error) => {
        alert(error.response.data[0].message);
      });
  };

  //-----------------------------Proctucts fetch Functions-----------------------
  const fetchAll = () => {
    var config = {
      method: "get",
      url: `${domain}:4000/products`,
    };
    axios(config).then((response) => {
      setProductsList(response.data);
    });
  };
  const fetchById = (id) => {
    setIsLoading(true);
    var config = {
      method: "post",
      url: `${domain}:4000/product`,
      data: { id },
    };
    axios(config).then((response) => {
      setIsProductById(response.data);
      setIsLoading(false);
    });
  };
  const collectionByHandle = (collectionhandle) => {
    setIsLoading(true);
    var config = {
      method: "post",
      url: `${domain}:4000/collectionbyhandle`,
      data: { collectionhandle: collectionhandle },
    };
    axios(config).then((response) => {
      setCollection(response.data);
      setIsLoading(false);
    });
  };

  //----------------------------------------Cart functions-------------------
  const createCart = async () => {
    var config = {
      method: "post",
      url: `${domain}:4000/createcart`,
    };
    await axios(config)
      .then((response) => {
        if (updateCartId.current) {
          var config = {
            method: "post",
            url: `${domain}:4000/updateUserCartId`,
            data: {
              cartId: response.data.id,
              metaFieldId: cartMetaID.current,
              customerId: customerId.current,
            },
          };
          axios(config)
            .then((response) => {
              console.log(response.data);
              localStorage.setItem("ATG_CartId", JSON.stringify(response.data));
            })
            .catch((error) => {
              console.log(error.response);
            });
        }
        setCartId(response.data.id);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const fetchCart = async () => {
    var config = {
      method: "post",
      url: `${domain}:4000/fetchcart`,
      data: { id: JSON.parse(localStorage.getItem("ATG_CartId")) },
    };
    await axios(config)
      .then((response) => {
        if (response.data.id) {
          setCart(response.data);
        } else {
          updateCartId.current = true;
          createCart();
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const addItemToCart = async (variantId, quantity) => {
    setIsAdding(variantId);
    setIsLoading(true);
    const data = {
      cartId,
      variantId,
      quantity: parseInt(quantity, 10),
    };
    var config = {
      method: "post",
      url: `${domain}:4000/addtocart`,
      data: data,
    };
    await axios(config)
      .then((response) => {
        setCart(response.data);
        setIsLoading(false);
        setIsAdding(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const removeItemFromCart = async (merchandiseId) => {
    setIsLoading(true);
    const data = {
      cartId,
      merchandiseId:
        typeof merchandiseId === "string" ? [merchandiseId] : merchandiseId,
    };
    var config = {
      method: "post",
      url: `${domain}:4000/removefromcart`,
      data: data,
    };
    await axios(config)
      .then((response) => {
        setCart(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const updateItemToCart = async (id, quantity) => {
    setIsLoading(true);
    const data = {
      cartId,
      id,
      quantity,
    };
    var config = {
      method: "post",
      url: `${domain}:4000/updatecart`,
      data: data,
    };
    await axios(config)
      .then((response) => {
        setCart(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  //----------------------------------------Wishlist functions-------------------
  const fetchWishList = async () => {
    var config = {
      method: "post",
      url: `${domain}:4000/fetchWishList`,
      data: {
        accessToken: JSON.parse(localStorage.getItem("ATG_AccessToken")),
      },
    };
    await axios(config)
      .then((response) => {
        setWishListIDs(response.data.wishListIDs);
        setWishList(response.data.wishList);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  //both add and remove item from wishlist functionality is happening in below function(updateWishList).
  const updateWishList = async (productId, addFunction) => {
    setHeartLoading(productId);
    wishListIDs[0] === "Default_Parameter" && wishListIDs.shift();
    const updatedList = addFunction
      ? [...wishListIDs, productId].join(",")
      : wishListIDs.filter((value) => value !== productId).join(",");
    var config = {
      method: "post",
      url: `${domain}:4000/updateWishList`,
      data: {
        accessToken: JSON.parse(localStorage.getItem("ATG_AccessToken")),
        customerId: customerId.current,
        metafieldId: wishlistMetaID.current,
        updatedList: updatedList ? updatedList : "Default_Parameter",
      },
    };
    await axios(config)
      .then((response) => {
        setHeartLoading(false);
        setWishListIDs(response.data.wishListIDs);
        setWishList(response.data.wishList);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  //---------------------------------------- Cart_Save_for_later functions-------------------
  const fetchSavedCart = async () => {
    var config = {
      method: "post",
      url: `${domain}:4000/fetchSavedCart`,
      data: {
        accessToken: JSON.parse(localStorage.getItem("ATG_AccessToken")),
      },
    };
    await axios(config)
      .then((response) => {
        setSavedCartIDs(response.data.productsIDs);
        setSavedCart(response.data.productsList);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const addSavedCart = async () => {
    setIsLoading(true);
    let removeIdsList = [];
    let saveProductIdsList = [];
    let saveVariantIdsList = [];
    cart.lines.edges.map(({ node }) => {
      removeIdsList.push(node.id);
      saveProductIdsList.push(node.merchandise.product.id);
      saveVariantIdsList.push(node.merchandise.id);
      return null;
    });
    removeItemFromCart(removeIdsList);
    var config = {
      method: "post",
      url: `${domain}:4000/addSavedCart`,
      data: {
        customerId: customerId.current,
        metafieldId: savedCartMetaID.current,
        metafieldVal: `${saveProductIdsList.join(
          ","
        )}??--split--??${saveVariantIdsList.join(",")}`,
      },
    };
    await axios(config)
      .then((response) => {
        setSavedCartIDs(saveProductIdsList);
        setSavedCart(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  ////---------------------------------------- Save_for_later functions-------------------
  //const fetchSaveForLater = async () => {
  //  var config = {
  //    method: "post",
  //    url: `${domain}:4000/fetchSaveForLater`,
  //    data: {
  //      accessToken: JSON.parse(localStorage.getItem("ATG_AccessToken")),
  //    },
  //  };
  //  await axios(config)
  //    .then((response) => {
  //      setSaveForLaterIDs(response.data.productsIDs);
  //      setSaveForLater(response.data.productsList);
  //    })
  //    .catch((error) => {
  //      console.log(error.response);
  //    });
  //};
  ////both add and remove item from save for later functionality is happening in below function(updateSaveForLater).
  //const updateSaveForLater = async (productId, merchandiseId, moveToCart) => {
  //  setIsLoading(true);
  //  merchandiseId && moveToCart
  //    ? addItemToCart(merchandiseId, 1)
  //    : removeItemFromCart(merchandiseId);
  //  saveForLaterIDs[0] === "Default_Parameter" && saveForLaterIDs.shift();
  //  const updatedList =
  //    merchandiseId && !moveToCart
  //      ? [...saveForLaterIDs, productId].join(",")
  //      : saveForLaterIDs.filter((value) => value !== productId).join(",");
  //  var config = {
  //    method: "post",
  //    url: `${domain}:4000/updateSaveForLater`,
  //    data: {
  //      accessToken: JSON.parse(localStorage.getItem("ATG_AccessToken")),
  //      customerId: customerId.current,
  //      metafieldId: saveForLaterMetaID.current,
  //      updatedList: updatedList ? updatedList : "Default_Parameter",
  //    },
  //  };
  //  await axios(config)
  //    .then((response) => {
  //      setIsLoading(false);
  //      setSaveForLaterIDs(response.data.productsIDs);
  //      setSaveForLater(response.data.productsList);
  //    })
  //    .catch((error) => {
  //      console.log(error.response);
  //    });
  //};

  return (
    <ShopContext.Provider
      value={{
        productsList,
        cart,
        isLoading,
        isAdding,
        isProductById,
        accessToken,
        isUserProfile,
        editShow,
        editAddressData,
        showAddress,
        collection,
        wishList,
        wishListIDs,
        heartLoading,
        saveForLater,
        isMobile,
        savedCart,
        savedCartIDs,
        setWishListIDs,
        setWishList,
        setShowAddress,
        createAddress,
        editAddress,
        deleteAddress,
        updateProfile,
        setEditAddressData,
        setEditShow,
        userProfile,
        fetchById,
        fetchAll,
        addItemToCart,
        removeItemFromCart,
        updateItemToCart,
        signIn,
        signUp,
        setAccessToken,
        signOut,
        collectionByHandle,
        updateWishList,
        fetchSavedCart,
        addSavedCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

const ShopConsumer = ShopContext.Consumer;
export { ShopConsumer, ShopContext };

export default ShopProvider;
