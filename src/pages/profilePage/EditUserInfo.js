import React, { useContext } from "react";
import InputField from "../../components/InputField";
import { ShopContext } from "../../contexts/ShopContext";

const EditUserInfo = () => {
  const { isUserProfile, editShow, accessToken, updateProfile } =
    useContext(ShopContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstname, lastname } = e.target;
    const phone = `+${e.target[3].value.replace(/\D/g, "")}`;
    updateProfile({
      phone: phone,
      lastName: lastname.value,
      firstName: firstname.value,
      accessToken: accessToken.accessToken,
    });
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
              return <div key={index}>{InputField(data)}</div>;
            })}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditUserInfo;
