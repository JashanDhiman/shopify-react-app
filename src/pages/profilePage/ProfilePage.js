import React, { useContext, useEffect } from "react";
import Loading from "../../components/Loading";
import { ShopContext } from "../../contexts/ShopContext";
import "./profilePage.css";

const ProfilePage = () => {
  const { userProfile, isUserProfile } = useContext(ShopContext);
  useEffect(() => {
    userProfile();
  }, []);
  console.log(isUserProfile);
  if (isUserProfile) {
    var fname = isUserProfile.firstName;
    var lname = isUserProfile.lastName;
    var email = isUserProfile.email;
    var address = isUserProfile.defaultAddress.address1;
    var city = isUserProfile.defaultAddress.city;
    var country = isUserProfile.defaultAddress.country;
    var zip = isUserProfile.defaultAddress.zip;
    var joined = isUserProfile.createdAt;
    var orders = isUserProfile.orders.edges;
  }
  const handleEdit = () => {
    console.log("edit");
  };
  return (
    <>
      {isUserProfile ? (
        <div className="profile-page">
          <h1>User Profile</h1>
          <div>
            <h1 className="display-2" style={{ textTransform: "capitalize" }}>
              Hello {fname}
            </h1>
            <p>Joined us {joined}</p>
            <p>
              This is your profile page. You can see and edit your details here.
            </p>
            <button onClick={() => handleEdit} className="btn btn-info">
              Edit Profile
            </button>
          </div>
          <div>
            <div>
              <h2>My Account</h2>
            </div>
            <div>
              <h2>User Information</h2>
              <div className="general-data">
                <div>
                  <label className="form-control-label" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    className="form-control form-control-alternative"
                    type="text"
                    id="email"
                    defaultValue={email}
                  />
                </div>
                <div>
                  <label className="form-control-label" htmlFor="firstname">
                    First Name
                  </label>
                  <input
                    className="form-control form-control-alternative"
                    type="text"
                    id="firstname"
                    defaultValue={fname}
                  />
                </div>
                <div>
                  <label className="form-control-label" htmlFor="lastname">
                    Last Name
                  </label>
                  <input
                    className="form-control form-control-alternative"
                    type="text"
                    id="lastname"
                    defaultValue={lname}
                  />
                </div>
              </div>
              <hr></hr>
              <div className="contact-info">
                <div>
                  <label className="form-control-label" htmlFor="address">
                    Address
                  </label>
                  <input
                    className="form-control form-control-alternative"
                    type="text"
                    id="address"
                    defaultValue={address}
                  />
                </div>
                <div>
                  <label className="form-control-label" htmlFor="city">
                    City
                  </label>
                  <input
                    className="form-control form-control-alternative"
                    type="text"
                    id="city"
                    defaultValue={city}
                  />
                </div>
                <div>
                  <label className="form-control-label" htmlFor="country">
                    Country
                  </label>
                  <input
                    className="form-control form-control-alternative"
                    type="text"
                    id="country"
                    defaultValue={country}
                  />
                </div>
                <div>
                  <label className="form-control-label" htmlFor="zip">
                    Zip
                  </label>
                  <input
                    className="form-control form-control-alternative"
                    type="text"
                    id="zip"
                    defaultValue={zip}
                  />
                </div>
              </div>
              <hr></hr>
              <div className="order-detail">
                <h2>Orders Detail</h2>
                <table>
                  <thead>
                    <tr>
                      <td>ORDER</td>
                      <td>DATE</td>
                      <td>PAYMENT STATUS</td>
                      <td>FULFILLMENT STATUS</td>
                      <td>TOTAL</td>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => {
                      const orderName = order.node.name;
                      const financialStatus = order.node.financialStatus;
                      const fulfillmentStatus = order.node.fulfillmentStatus;
                      const processedAt = order.node.processedAt;
                      const total = order.node.totalPriceV2.amount;
                      return (
                        <tr key={index}>
                          <td>{orderName}</td>
                          <td>{processedAt}</td>
                          <td>{financialStatus}</td>
                          <td>{fulfillmentStatus}</td>
                          <td>{total}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {/*<div>
                  <label  className="form-control-label" htmlFor="dispalyname"></label>
                  <input className="form-control form-control-alternative" type="text"  defaultValue={} />
                </div>
                <div>
                  <label  className="form-control-label" htmlFor="dispalyname">Email Address</label>
                  <input className="form-control form-control-alternative" type="text"  defaultValue={} />
                </div>
                <div>
                  <label  className="form-control-label" htmlFor="dispalyname">First Name</label>
                  <input className="form-control form-control-alternative" type="text"  defaultValue={} />
                </div>
                <div>
                  <label  className="form-control-label" htmlFor="dispalyname">Last Name</label>
                  <input className="form-control form-control-alternative" type="text"  defaultValue={} />
                </div>*/}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProfilePage;
