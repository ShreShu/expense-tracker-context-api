import React, { useContext, useState } from "react";
import "./UpdateProfile.css";
import axios from "axios";
import AuthContext from "../Store/AuthContext";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const authCtx = useContext(AuthContext);

  const onNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const onUrlChange = (e) => {
    setPhotoUrl(e.target.value);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD-IAdSLJd4wZwTTwKGww0WlQWonD4KNH0",
        {
          idToken: authCtx.tokenId,
          displayName: name,
          photoUrl: photoUrl,
          deleteAttribute: "PHOTO_URL",
          returnSecureToken: true,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log();
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
            />
          </div>
        </div>

        <button type="submit" className="btn btn-sm update__profile__button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
