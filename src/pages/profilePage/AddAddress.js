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
      {id === "phone" ? (
        <CountrySelector value={data} />
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

const AddAddress = () => {
  const { editAddressData, setShowAddress } = useContext(ShopContext);

  if (editAddressData) {
    const { id, firstname, lastname, phone, address1, city, country, zip } =
      editAddressData;
    const userInfoList = [
      { id: "firstname", label: "First Name", data: firstname },
      { id: "lastname", label: "Last Name", data: lastname },
      { id: "phone", label: "Phone no", data: phone },
      { id: "address", label: "Address", data: address1 },
      { id: "city", label: "City", data: city },
      { id: "country", label: "Country", data: country },
      { id: "zip", label: "Zip", data: zip },
    ];

    const handleSubmit = (e) => {
      e.preventDefault();
      const { firstname, lastname, phone, address, city, country, zip } =
        e.target;
      const userVariables = {
        phone: phone.value,
        lastName: lastname.value,
        firstName: firstname.value,
        address: address.value,
        city: city.value,
        country: country.value,
        zip: zip.value,
        addressId: id,
      };
      setShowAddress(false);
    };
    return (
      <div className="edit-profile">
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
          </div>
        </form>
      </div>
    );
  }
  return null;
};

export default AddAddress;
