import React, { useContext } from "react";
import CountrySelector from "../../components/CountrySelector";
import { ShopContext } from "../../contexts/ShopContext";

const Input = (e) => {
  const { id, label, data } = e;
  return (
    <div>
      <label className="form-control-label" htmlFor={id}>
        {label}
      </label>
      {id == "phone" ? (
        <CountrySelector />
      ) : (
        <input
          className="form-control form-control-alternative"
          type="text"
          id={id}
          defaultValue={data}
        />
      )}
    </div>
  );
};

const EditUserInfo = () => {
  const { isUserProfile, editShow, setEditShow } = useContext(ShopContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    setEditShow(false);
    const { firstname, lastname, phone } = e.target;
    const userVariables = {
      phone: phone.value,
      lastName: lastname.value,
      firstName: firstname.value,
    };
  };
  var fname = isUserProfile.firstName;
  var lname = isUserProfile.lastName;
  var phone = isUserProfile.phone;
  const userInfoList = [
    { id: "firstname", label: "First Name", data: fname },
    { id: "lastname", label: "Last Name", data: lname },
    { id: "phone", label: "Phone no", data: phone },
  ];

  return (
    <div
      className="edit-profile"
      style={{ display: editShow ? "block" : "none" }}
    >
      <form className="my-account" onSubmit={handleSubmit}>
        <div className="edit-header">
          <h2>Edit Profile</h2>
        </div>
        <br></br>
        <div className="edit-div">
          <div className="header">
            <h3>User Information</h3>
            <button className="btn btn-info">Save</button>
          </div>
          <div className="general-data input-group">
            {userInfoList.map((data, index) => {
              return <div key={index}>{Input(data)}</div>;
            })}
          </div>
          {/*<hr></hr>
          <div className="header">
            <h3>Address Information</h3>
            <button className="btn btn-info">Save</button>
          </div>
          <div>
            {addresses.map((address, index) => {
              const { addressId, address1, city, country, zip } = address.node;
              const userAddressList = [
                { id: "address", label: "Address", data: address1 },
                { id: "city", label: "City", data: city },
                { id: "country", label: "Country", data: country },
                { id: "zip", label: "Zip", data: zip },
              ];
              return (
                <div key={index}>
                  <h4 style={{ marginLeft: "0.5rem" }}>{`Address ${
                    index + 1
                  }`}</h4>

                  <div className="contact-info input-group">
                    {userAddressList.map((data, index) => {
                      return <div key={index}>{Input(data)}</div>;
                    })}
                  </div>
                  <hr></hr>
                </div>
              );
            })}
          </div>*/}
        </div>
      </form>
    </div>
  );
};

export default EditUserInfo;
