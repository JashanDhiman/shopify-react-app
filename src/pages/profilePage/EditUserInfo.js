import React, { useContext } from "react";
import InputField from "../../components/InputField";
import { ShopContext } from "../../contexts/ShopContext";
import { ImCross } from "react-icons/im";

const EditUserInfo = () => {
  const { isUserProfile, setEditShow, accessToken, updateProfile } =
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
    <div className="edit-profile">
      <div className="my-account">
        <div className="edit-header">
          <h2>Edit Profile</h2>
          <i className="icons" onClick={() => setEditShow(false)}>
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
};

export default EditUserInfo;
