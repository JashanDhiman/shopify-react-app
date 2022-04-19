import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import "./registerPage/registerPage.css";

const RegisterPage = () => {
  let navigate = useNavigate();
  const { setAccessToken } = useContext(ShopContext);
  //--------------------------------sign in function------------------------------------
  const handleSignin = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    const userVariables = {
      email: email.value,
      password: password.value,
    };

    const makeQuery = async () => {
      var config = {
        method: "post",
        url: "http://localhost:4000/signin",
        data: userVariables,
      };
      await axios(config)
        .then((response) => {
          setAccessToken(response.data);
          navigate(`/homepage`);
          //navigate(`/${response.data.accessToken}/homepage`);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    };
    makeQuery();
  };

  //--------------------------------sign up function starts------------------------------------
  const handleSignup = (e) => {
    e.preventDefault();
    const { fname, lname, email, password1, password2 } = e.target;
    const userVariables = {
      email: email.value,
      password: password1.value,
      lastName: lname.value,
      firstName: fname.value,
    };
    if (password1.value && password2.value) {
      if (password1.value === password2.value) {
        const makeQuery = async () => {
          var config = {
            method: "post",
            url: "http://localhost:4000/signup",
            data: userVariables,
          };
          await axios(config)
            .then((response) => {
              //console.log(response.data);
              setAccessToken(response.data);
              navigate(`/homepage`);
              //navigate(`/${response.data.accessToken}/homepage`);
            })
            .catch((error) => {
              console.log(error.response.data);
            });
        };
        makeQuery();
      } else {
        document.getElementById("passErr").innerHTML =
          "**Passwords didn't match";
      }
    } else {
      document.getElementById("passErr").innerHTML =
        "**Please provide password";
    }
  };
  //--------------------------------sign up function ends------------------------------------

  let container = document.getElementById("container");
  const handleToggle = () => {
    container.classList.toggle("sign-in");
    container.classList.toggle("sign-up");
  };
  const verifyPassword = (e) => {
    const pw1 = document.getElementById("pass1").value;
    const pw2 = document.getElementById("pass2").value;
    if (pw1.length < 8) {
      document.getElementById("passErr").innerHTML =
        "**Password has atleast 8 chracters";
    } else if (pw1 !== pw2) {
      document.getElementById("passErr").innerHTML = "**Passwords didn't match";
    } else {
      document.getElementById("passErr").innerHTML = "";
    }
  };
  if (container) {
    setTimeout(() => {
      container.classList.add("sign-in");
    }, 200);
  }
  return (
    <div id="container" className={`container`}>
      <div className="row">
        {/* Sign up starts */}
        <form
          className="col align-items-center flex-col sign-up"
          onSubmit={handleSignup}
        >
          <div className="form-wrapper align-items-center">
            <div className="form sign-up">
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input
                  required
                  name="fname"
                  type="text"
                  placeholder="First name"
                />
              </div>
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input
                  required
                  name="lname"
                  type="text"
                  placeholder="Last name"
                />
              </div>
              <div className="input-group">
                <i className="bx bx-mail-send"></i>
                <input required name="email" type="email" placeholder="Email" />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input
                  required
                  name="password1"
                  type="password"
                  placeholder="Password"
                  id="pass1"
                  onChange={(e) => verifyPassword(e)}
                />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input
                  required
                  name="password2"
                  type="password"
                  placeholder="Confirm password"
                  id="pass2"
                  onChange={(e) => verifyPassword(e)}
                />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <span id="passErr"></span>
              </div>
              <button type="submit">Sign up</button>
              <p>
                <span>Already have an account?</span>
                <b onClick={() => handleToggle()} className="pointer">
                  Sign in here
                </b>
              </p>
            </div>
          </div>
        </form>
        {/* Sign in starts */}
        <form
          className="col align-items-center flex-col sign-in"
          onSubmit={handleSignin}
        >
          <div className="form-wrapper align-items-center">
            <div className="form sign-in">
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input required name="email" type="email" placeholder="Email" />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input
                  required
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </div>
              <button type="submit">Sign in</button>
              <p>
                <b>Forgot password?</b>
              </p>
              <p>
                <span>Don't have an account?</span>
                <b onClick={() => handleToggle()} className="pointer">
                  Sign up here
                </b>
              </p>
            </div>
          </div>
          <div className="form-wrapper"></div>
        </form>
      </div>
      <div className="row content-row">
        <div className="col align-items-center flex-col">
          <div className="text sign-in">
            <h2>Welcome</h2>
          </div>
          <div className="img sign-in"></div>
        </div>
        <div className="col align-items-center flex-col">
          <div className="img sign-up"></div>
          <div className="text sign-up">
            <h2>Join with us</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
