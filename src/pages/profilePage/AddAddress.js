import React, { useContext } from "react";
import InputField from "../../components/InputField";
import { ShopContext } from "../../contexts/ShopContext";
import { ImCross } from "react-icons/im";

const AddAddress = () => {
  const { showAddress, createAddress, setShowAddress } =
    useContext(ShopContext);

  if (showAddress) {
    const userInfoList = [
      { id: "firstname", label: "First Name", data: "jashan" },
      { id: "lastname", label: "Last Name", data: "dhiman" },
      { id: "phone", label: "Phone no", data: "+919872076386" },
      { id: "address", label: "Address", data: "sector 19 d" },
      { id: "city", label: "City", data: "chandigarh" },
      { id: "country", label: "Country", data: "india" },
      { id: "zip", label: "Zip", data: "160019" },
    ];
    const handleSubmit = (e) => {
      e.preventDefault();
      const { firstname, lastname, address, city, country, zip } = e.target;
      const phone = `+${e.target[3].value.replace(/\D/g, "")}`;
      const userVariables = {
        phone: phone,
        lastName: lastname.value,
        firstName: firstname.value,
        address1: address.value,
        city: city.value,
        country: country.value,
        zip: zip.value,
      };
      createAddress(userVariables);
    };
    return (
      <div className="edit-profile">
        <div className="my-account" onSubmit={handleSubmit}>
          <div className="edit-header">
            <h2>Create Address</h2>
            <i className="icons" onClick={() => setShowAddress(false)}>
              <ImCross />
            </i>
          </div>
          <br></br>
          <form className="edit-div" onSubmit={handleSubmit}>
            <div className="header">
              <h3>User Information</h3>
              <button className="btn btn-info">Save</button>
            </div>
            <div className="general-data input-group">
              {userInfoList.map((data, index) => {
                return <div key={index}>{InputField(data)}</div>;
              })}
            </div>
          </form>
        </div>
      </div>
    );
  }
  return null;
};

export default AddAddress;
