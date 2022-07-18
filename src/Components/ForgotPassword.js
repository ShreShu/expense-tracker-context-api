import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const emailChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD-IAdSLJd4wZwTTwKGww0WlQWonD4KNH0",
        {
          requestType: "PASSWORD_RESET",
          email: email,
        }
      )
      .then((res) => {
        alert("Reset link sent to your mail id");
        navigate("/login");
      })
      .catch((err) => {
        alert(err.response?.data?.error?.message);
      });
  };
  return (
    <div>
      <form className="sign-up-form" onSubmit={formSubmitHandler}>
        <h3 className="signup-heading">Forgot Password</h3>
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
        <button type="submit" className="btn btn-primary ">
          Click to send password reset link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
