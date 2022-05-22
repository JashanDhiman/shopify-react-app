import React, { useContext, useEffect } from "react";
import Loading from "../../components/Loading";
import { ShopContext } from "../../contexts/ShopContext";
import "./profilePage.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdAddCircle } from "react-icons/md";
import EditUserInfo from "./EditUserInfo";
import EditAddress from "./EditAddress";
import AddAddress from "./AddAddress";
import Layout from "../../components/Layout";

const Input = (e) => {
  const { label, data } = e;
  return (
    <>
      <label className="form-control-label">{label}</label>
      <p>{data ? data : "--"}</p>
    </>
  );
};
const ProfilePage = () => {
  const {
    userProfile,
    isUserProfile,
    isLoading,
    setEditShow,
    deleteAddress,
    setEditAddressData,
    setShowAddress,
  } = useContext(ShopContext);
  useEffect(() => {
    userProfile();
  }, []);
  if (isUserProfile) {
    const fname = isUserProfile.firstName;
    const lname = isUserProfile.lastName;
    const email = isUserProfile.email;
    const phone = isUserProfile.phone;
    const addresses = isUserProfile.addresses.edges;
    const joined = isUserProfile.createdAt;
    const orders = isUserProfile.orders.edges;
    const userInfoList = [
      { label: "Email Address", data: email },
      { label: "First Name", data: fname },
      { label: "Last Name", data: lname },
      { label: "Phone no", data: phone },
    ];

    return (
      <Layout showFooter={true} showHeader={true} showCart={true}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: "10",
            //background:
          }}
        >
          {/*<Loading />*/}
          {isLoading && <Loading />}
        </div>
        <div className="profile-page">
          <div className="say-hello">
            <h1 className="display-2" style={{ textTransform: "capitalize" }}>
              Hello {fname}
            </h1>
            <p>Joined us {joined.split("T")[0]}</p>
            <p style={{ textAlign: "center" }}>
              This is your profile page. You can see and edit your details here.
            </p>
            <button onClick={() => setEditShow(true)} className="btn btn-info">
              Edit Profile
            </button>
          </div>
          <div className="user-data">
            <div className="my-account">
              <h2>My Account</h2>
              <br></br>
              <div>
                <h3>User Information</h3>
                <div className="general-data input-group">
                  {userInfoList.map((data, index) => {
                    return <div key={index}>{Input(data)}</div>;
                  })}
                </div>
                <hr></hr>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>Address Information</h3>
                  <i
                    className="icons"
                    onClick={() => setShowAddress(true)}
                    title="Create"
                  >
                    <MdAddCircle />
                  </i>
                </div>
                <div>
                  {addresses.length > 0 ? (
                    addresses.map((address, index) => {
                      const { id, address1, city, country, zip } = address.node;
                      const userAddressList = [
                        { label: "Address", data: address1 },
                        { label: "City", data: city },
                        { label: "Country", data: country },
                        { label: "Zip", data: zip },
                      ];
                      return (
                        <div key={index}>
                          <div className="header">
                            <h4 style={{ marginLeft: "0.5rem" }}>{`Address ${
                              index + 1
                            }`}</h4>
                            <div>
                              <i
                                title="Edit"
                                className="icons"
                                onClick={() => setEditAddressData(address.node)}
                              >
                                <AiFillEdit />
                              </i>
                              <i
                                title="Delete"
                                className="icons"
                                onClick={() => deleteAddress(id)}
                              >
                                <AiFillDelete />
                              </i>
                            </div>
                          </div>
                          <div className="contact-info input-group">
                            {userAddressList.map((data, index) => {
                              return <div key={index}>{Input(data)}</div>;
                            })}
                          </div>
                          <hr></hr>
                        </div>
                      );
                    })
                  ) : (
                    <span>You have no Address yet.</span>
                  )}
                </div>
              </div>
            </div>
            <div className="my-orders">
              <h2>My Orders</h2>
              <div className="order-detail">
                {orders.map((order, index) => {
                  const orderName = order.node.name;
                  const financialStatus = order.node.financialStatus;
                  const fulfillmentStatus = order.node.fulfillmentStatus;
                  const processedAt = order.node.processedAt;
                  const total = order.node.totalPriceV2.amount;
                  return (
                    <div key={index} className="orders-div">
                      <div className="orders-data">
                        <p>ORDER</p>
                        <p>DATE</p>
                        <p>PAYMENT STATUS</p>
                        <p>FULFILLMENT STATUS</p>
                        <p>TOTAL</p>
                      </div>
                      <div className="orders-data">
                        <p>
                          <a href={`/order/${orderName}`} title="View Order">
                            {orderName}
                          </a>
                        </p>
                        <p>{processedAt.split("T")[0]}</p>
                        <p>{financialStatus}</p>
                        <p>{fulfillmentStatus}</p>
                        <p>Rs. {total}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/*<EditUserInfo />*/}
          <EditAddress />
          <AddAddress />
        </div>
      </Layout>
    );
  }
  return <Loading />;
};

export default ProfilePage;
