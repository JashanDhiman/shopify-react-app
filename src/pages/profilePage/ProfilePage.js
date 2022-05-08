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
    var phone = isUserProfile.phone;
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
  const handleSubmit = (e) => {
    e.preventDefault();
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
            <p>
              This is your profile page. You can see and edit your details here.
            </p>
            <button onClick={() => handleEdit} className="btn btn-info">
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
                    <label className="form-control-label" htmlFor="email">
                      Email Address
                    </label>
                    <input
                      className="form-control form-control-alternative"
                      type="text"
                      id="email"
                      defaultValue={email ? email : "Null"}
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
                      defaultValue={phone ? phone : "Null"}
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
                      defaultValue={fname ? fname : "Null"}
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
                      defaultValue={lname ? lname : "Null"}
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
                      defaultValue={address ? address : "Null"}
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
                      defaultValue={city ? city : "Null"}
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
                      defaultValue={country ? country : "Null"}
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
                      defaultValue={zip ? zip : "Null"}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="my-orders">
              <h2>My Orders</h2>
              <br></br>
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
          <div className="edit-profile">
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
                      defaultValue={email ? email : "Null"}
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
                      defaultValue={phone ? phone : "Null"}
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
                      defaultValue={fname ? fname : "Null"}
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
                      defaultValue={lname ? lname : "Null"}
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
                      defaultValue={address ? address : "Null"}
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
                      defaultValue={city ? city : "Null"}
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
                      defaultValue={country ? country : "Null"}
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
                      defaultValue={zip ? zip : "Null"}
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
