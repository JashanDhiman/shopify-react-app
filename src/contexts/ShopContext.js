import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const ShopContext = React.createContext();

const ShopProvider = ({ children }) => {
  const [productsList, setProductsList] = useState(false);
  const [wishList, setWishList] = useState(false);
  const [wishListIDs, setWishListIDs] = useState([]);
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
  const updateCartId = useRef(false);
  const domain = process.env.REACT_APP_DEPLOY_DOMAIN;
  /*eslint-disable */
  useEffect(() => {
    if (localStorage.ATG_AccessToken) {
      fetchWishList();
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

  //-----------------------------User Control Functions starts-----------------------
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
        fetchUserCartId();
        navigate(`/homepage`);
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
        fetchUserCartId();
        navigate(`/homepage`);
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
        navigate("/");
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
          console.log("update", accessToken);
          var config = {
            method: "post",
            url: `${domain}:4000/updateUserCartId`,
            data: {
              //accessToken: JSON.parse(localStorage.ATG_AccessToken),
              cartId: cartId,
              metaFieldId: JSON.parse(localStorage.ATG_CartId.id),
            },
          };
          axios(config)
            .then((response) => {
              console.log(response.data);
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
  const fetchUserCartId = async () => {
    var config = {
      method: "post",
      url: `${domain}:4000/fetchUserCartId`,
      data: {
        accessToken: JSON.parse(localStorage.getItem("ATG_AccessToken")),
      },
    };
    await axios(config)
      .then((response) => {
        localStorage.setItem("ATG_CartId", JSON.stringify(response.data));
        setCartId(response.data.value);
        fetchCart();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const fetchCart = async () => {
    var config = {
      method: "post",
      url: `${domain}:4000/fetchcart`,
      data: { id: JSON.parse(localStorage.getItem("ATG_CartId")).value },
    };
    await axios(config)
      .then((response) => {
        if (response.data.id) {
          setCartId(response.data.id);
          setCart(response.data);
        } else {
          updateCartId.current = true;
          console.log(response.data, "fetch");
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
      merchandiseId,
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

  //----------------------------------------Cart functions-------------------
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
  const addToWishList = async (productId) => {
    //setWishListIDs([...wishListIDs, productId]);
    const updatedList = [...wishListIDs, productId].join(",");
    //console.log(updatedList);
    var config = {
      method: "post",
      url: `${domain}:4000/addToWishList`,
      data: {
        accessToken: JSON.parse(localStorage.getItem("ATG_AccessToken")),
        updatedList: updatedList,
      },
    };
    await axios(config)
      .then((response) => {
        console.log(response.data);
        //setWishListIDs(response.data.wishListIDs);
        //setWishList(response.data.wishList);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const removeFromWishList = async (productId) => {
    var config = {
      method: "post",
      url: `${domain}:4000/removeFromWishList`,
      data: productId,
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
        addToWishList,
        removeFromWishList,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

const ShopConsumer = ShopContext.Consumer;
export { ShopConsumer, ShopContext };

export default ShopProvider;
