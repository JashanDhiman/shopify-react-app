import React, { useContext, useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { ShopContext } from "../../contexts/ShopContext";
import "./profilePage.css";

const ProfilePage = () => {
  const { userProfile, isUserProfile } = useContext(ShopContext);
  useEffect(() => {
    userProfile();
  }, []);
  const [editShow, setEditShow] = useState(false);
  console.log(isUserProfile);

  if (isUserProfile) {
    var fname = isUserProfile.firstName;
    var lname = isUserProfile.lastName;
    var email = isUserProfile.email;
    var phone = isUserProfile.phone;
    var address = isUserProfile.defaultAddress.address1;
    var city = isUserProfile.defaultAddress.city;
    var country = isUserProfile.defaultAddress.country;
    var zip = isUserProfile.defaultAddress.zip;
    var joined = isUserProfile.createdAt;
    var orders = isUserProfile.orders.edges;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setEditShow(false);
    const { firstname, lastname, email, phone, address, city, country, zip } =
      e.target;
    const userVariables = {
      email: email.value,
      phone: phone.value,
      lastName: lastname.value,
      firstName: firstname.value,
      address: address.value,
      city: city.value,
      country: country.value,
      zip: zip.value,
    };
  };
  return (
    <>
      {isUserProfile ? (
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
                  <div>
                    <label className="form-control-label">Email Address</label>
                    <p>{email ? email : "--"}</p>
                  </div>
                  <div>
                    <label className="form-control-label">Phone no</label>
                    <p>{phone ? phone : "--"}</p>
                  </div>
                  <div>
                    <label className="form-control-label">First Name</label>
                    <p>{fname ? fname : "--"}</p>
                  </div>
                  <div>
                    <label className="form-control-label">Last Name</label>
                    <p>{lname ? lname : "--"}</p>
                  </div>
                </div>
                <hr></hr>
                <h3>Address Information</h3>
                <div className="contact-info input-group">
                  <div>
                    <label className="form-control-label">Address</label>
                    <p>{address ? address : "--"}</p>
                  </div>
                  <div>
                    <label className="form-control-label">City</label>
                    <p>{city ? city : "--"}</p>
                  </div>
                  <div>
                    <label className="form-control-label">Country</label>
                    <p>{country ? country : "--"}</p>
                  </div>
                  <div>
                    <label className="form-control-label">Zip</label>
                    <p>{zip ? zip : "--"}</p>
                  </div>
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
                          <a href={`/order/${orderName}`}>{orderName}</a>
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
          <div
            className="edit-profile"
            style={{ display: editShow ? "block" : "none" }}
          >
            <form className="my-account" onSubmit={handleSubmit}>
              <div className="edit-header">
                <h2>Edit Profile</h2>
                <button className="btn btn-info">Save</button>
              </div>
              <br></br>
              <div className="edit-div">
                <h3>User Information</h3>
                <div className="general-data input-group">
                  <div>
                    <label className="form-control-label" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      className="form-control form-control-alternative"
                      type="text"
                      id="email"
                      defaultValue={email ? email : "--"}
                    />
                  </div>
                  <div>
                    <label className="form-control-label" htmlFor="phone">
                      Phone no
                    </label>
                    <input
                      className="form-control form-control-alternative"
                      type="text"
                      id="phone"
                      defaultValue={phone ? phone : "--"}
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
                      defaultValue={fname ? fname : "--"}
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
                      defaultValue={lname ? lname : "--"}
                    />
                  </div>
                </div>
                <hr></hr>
                <h3>Address Information</h3>
                <div className="contact-info input-group">
                  <div>
                    <label className="form-control-label" htmlFor="address">
                      Address
                    </label>
                    <input
                      className="form-control form-control-alternative"
                      type="text"
                      id="address"
                      defaultValue={address ? address : "--"}
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
                      defaultValue={city ? city : "--"}
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
                      defaultValue={country ? country : "--"}
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
                      defaultValue={zip ? zip : "--"}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProfilePage;
