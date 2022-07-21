import React, { useContext, useEffect, useState } from "react";
import "./UpdateProfile.css";
import axios from "axios";
import { useSelector } from "react-redux";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [mailIsVerified, setMailIsVerified] = useState();

  const tokenId = useSelector((state) => state.tokenId);
  const onNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const onUrlChange = (e) => {
    setPhotoUrl(e.target.value);
  };

  useEffect(() => {
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyD-IAdSLJd4wZwTTwKGww0WlQWonD4KNH0",
        {
          idToken: tokenId,
        }
      )
      .then((res) => {
        console.log(res);
        setName(res.data?.users[0]?.displayName);
        setPhotoUrl(res.data?.users[0]?.photoUrl);
        setMailIsVerified(res.data?.users[0]?.emailVerified);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const submitFormHandler = (event) => {
    event.preventDefault();
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD-IAdSLJd4wZwTTwKGww0WlQWonD4KNH0",
        {
          idToken: tokenId,
          displayName: name,
          photoUrl: photoUrl,
          returnSecureToken: true,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const verifyEmailHandler = () => {
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD-IAdSLJd4wZwTTwKGww0WlQWonD4KNH0",
        {
          requestType: "VERIFY_EMAIL",
          idToken: tokenId,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        alert(error.response?.data?.error?.message);
      });
  };
  return (
    <div className="update__profile">
      <form onSubmit={submitFormHandler}>
        <div className="row">
          <div className="col">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              className="form-control form-control-sm"
              placeholder="Full name"
              onChange={onNameChange}
              value={name}
            />
          </div>
          <div className="col">
            <label htmlFor="profilePicUrl">Profile Pic URL</label>
            <input
              type="text"
              id="profilePicUrl"
              className="form-control form-control-sm"
              placeholder="URL"
              onChange={onUrlChange}
              value={photoUrl}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-sm update__profile__button">
          Submit
        </button>
      </form>
      {!mailIsVerified && (
        <button
          className="update__profile__button"
          onClick={verifyEmailHandler}
        >
          Verify your mail ID
        </button>
      )}
    </div>
  );
};

export default UpdateProfile;
