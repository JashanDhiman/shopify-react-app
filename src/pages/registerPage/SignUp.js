import React, { useContext } from "react";
import { ShopContext } from "../../contexts/ShopContext";

const SignUp = (props) => {
  const { signUp } = useContext(ShopContext);

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
        signUp(userVariables);
      } else {
        document.getElementById("passErr").innerHTML =
          "**Passwords didn't match";
      }
    } else {
      document.getElementById("passErr").innerHTML =
        "**Please provide password";
    }
  };
  return (
    <>
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
              <b onClick={() => props.fun()} className="pointer">
                Sign in here
              </b>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};
export default SignUp;
