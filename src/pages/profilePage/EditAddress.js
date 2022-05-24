import React, { useContext } from "react";
import InputField from "../../components/InputField";
import { ShopContext } from "../../contexts/ShopContext";
import { ImCross } from "react-icons/im";

const EditAddress = () => {
  const { editAddressData, editAddress, setEditAddressData } =
    useContext(ShopContext);

  if (editAddressData) {
    const { id, firstName, lastName, phone, address1, city, country, zip } =
      editAddressData;
    const userInfoList = [
      { id: "firstname", label: "First Name", data: firstName },
      { id: "lastname", label: "Last Name", data: lastName },
      { id: "Phone", label: "Phone no", data: phone },
      { id: "address", label: "Address", data: address1 },
      { id: "city", label: "City", data: city },
      { id: "country", label: "Country", data: country },
      { id: "zip", label: "Zip", data: zip },
    ];

    const handleSubmit = (e) => {
      e.preventDefault();
      const { firstname, lastname, address, city, country, zip } = e.target;
      const phone = `+${e.target[3].value.replace(/\D/g, "")}`;
      const userVariables = {
        phone: phone,
        lastName: lastname.value,
        firstName: firstname.value,
        address: address.value,
        city: city.value,
        country: country.value,
        zip: zip.value,
        addressId: id,
      };
      editAddress(userVariables);
    };
    return (
      <div className="edit-profile">
        <form className="my-account" onSubmit={handleSubmit}>
          <div className="edit-header">
            <h2>Edit Address</h2>
            <i className="icons" onClick={() => setEditAddressData(false)}>
              <ImCross />
            </i>
          </div>
          <br></br>
          <div className="edit-div">
            <div className="header">
              <h3>Address Information</h3>
              <button className="btn btn-info">Save</button>
            </div>
            <div className="general-data input-group">
              {userInfoList.map((data, index) => {
                return <div key={index}>{InputField(data)}</div>;
              })}
            </div>
          </div>
        </form>
      </div>
    );
  }
  return null;
};

export default EditAddress;
