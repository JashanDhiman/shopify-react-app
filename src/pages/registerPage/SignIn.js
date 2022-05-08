import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../contexts/ShopContext";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";

const SignIn = (props) => {
  const { signIn } = useContext(ShopContext);
  const navigate = useNavigate();
  const handleSignin = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    const userVariables = {
      email: email.value,
      password: password.value,
    };
    signIn(userVariables);
    navigate(`/homepage`);
  };

  return (
    <>
      <form
        className="col align-items-center flex-col sign-in"
        onSubmit={handleSignin}
      >
        <div className="form-wrapper align-items-center">
          <div className="form sign-in">
            <div className="input-group">
              <i className="icons">
                <HiOutlineMail />
              </i>
              <input required name="email" type="email" placeholder="Email" />
            </div>
            <div className="input-group">
              <i className="icons">
                <RiLockPasswordFill />
              </i>
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
              <b onClick={() => props.fun()} className="pointer">
                Sign up here
              </b>
            </p>
          </div>
        </div>
        <div className="form-wrapper"></div>
      </form>
    </>
  );
};

export default SignIn;
