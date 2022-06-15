import axios from "axios";
import React from "react";
import { HiOutlineMail } from "react-icons/hi";

const ResetPassPage = () => {
  const domain = process.env.REACT_APP_DEPLOY_DOMAIN;
  const handleSubmit = (e) => {
    e.preventDefault();
    var config = {
      method: "post",
      url: `${domain}:4000/resetpass`,
      data: { email: e.target.email.value },
    };
    axios(config)
      .then((response) => {
        //console.log(response.data);
        alert(response.data);
      })
      .catch((error) => {
        alert(error.response.data[0].message);
      });
  };
  return (
    <div className="reset-pass">
      <div id="container" className="container">
        <div className="row">
          <form
            className="col align-items-center flex-col"
            onSubmit={handleSubmit}
            style={{ width: "100%" }}
          >
            <div className="form-wrapper align-items-center">
              <div
                className="form"
                style={{ transform: "scale(1)", width: "100%" }}
              >
                <h2 style={{ color: "var(--main-color)" }}>Reset Password</h2>
                <br></br>
                <div className="input-group">
                  <i className="icons">
                    <HiOutlineMail />
                  </i>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="Email"
                  />
                </div>
                <button type="submit">Send email</button>
              </div>
            </div>
            <div className="form-wrapper"></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassPage;
