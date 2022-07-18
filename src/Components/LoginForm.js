import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Store/AuthContext";
import { NavLink } from "react-router-dom";
import "./SignUpForm.css";
const LoginForm = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    // TODO: add Email validation
    if (email === "") {
      setEmailError("Email can't be empty");
      return;
    } else {
      setEmailError("");
    }
    if (password === "") {
      setPasswordError("Password  can't be empty");
      return;
    } else {
      setPasswordError("");
    }

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD-IAdSLJd4wZwTTwKGww0WlQWonD4KNH0",
        { email: email, password: password, returnSecureToken: true }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          authCtx.login(res.data.idToken);
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.error.message);
        //   {FIXME: Fix this alert box, alertbox is not getting diplayed  }
      });
  };
  const showAlert = (event) => {
    event.preventDefault();
    navigate("/signup");
  };

  const forgotPasswordHandler = () => {
    navigate("/forgotpassword");
  };

  return (
    <div>
      <form className="sign-up-form">
        <h3 className="signup-heading">Login</h3>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={emailChange}
          />
        </div>
        <span>{emailError}</span>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={passwordChange}
          />
        </div>
        <span>{passwordError}</span>
        <button onClick={formSubmitHandler} className="btn btn-primary ">
          Login
        </button>
        <button
          onClick={forgotPasswordHandler}
          className="btn btn-link"
          to="/forgotPassword"
        >
          Forgot password
        </button>
        <button onClick={showAlert} className="btn btn-outline-primary ">
          Don't have a account? Sign up
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
