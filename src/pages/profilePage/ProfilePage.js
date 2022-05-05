import React, { useContext, useEffect } from "react";
import { ShopContext } from "../../contexts/ShopContext";

const ProfilePage = () => {
  const { userProfile, isUserProfile } = useContext(ShopContext);
  useEffect(() => {
    userProfile();
  }, []);
  console.log(isUserProfile);
  return (
    //{isUserProfile?(
    //<>
    <div>User Profile</div>
    //  <div>
    //    <h2 style={{ textTransform: "capitalize" }}>
    //      Hello {isUserProfile.firstName}
    //    </h2>
    //  </div>
    //</>):(<Loading/>)}
  );
};

export default ProfilePage;
