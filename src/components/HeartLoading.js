import React from "react";
import { useContext } from "react";
import { AiTwotoneHeart, AiOutlineHeart } from "react-icons/ai";
import { ShopContext } from "../contexts/ShopContext";

const HeartLoading = ({ id }) => {
  const { updateWishList, heartLoading, wishListIDs } = useContext(ShopContext);
  return (
    <>
      <div
        className="likeedIcon"
        onClick={() => {
          wishListIDs.includes(id)
            ? updateWishList(id, false)
            : updateWishList(id, true);
        }}
      >
        {heartLoading === id ? (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <i className="icons">
            {wishListIDs.includes(id) ? <AiTwotoneHeart /> : <AiOutlineHeart />}
          </i>
        )}
      </div>
    </>
  );
};

export default HeartLoading;
