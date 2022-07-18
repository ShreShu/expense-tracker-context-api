import React, { useReducer } from "react";
import AuthContext from "./AuthContext";

const defaultState = {
  isloggedin: false,
  tokenId: "",
};

const loginReducer = (state, action) => {
  if (action.type === "LOGIN") {
    return {
      isloggedin: true,
      tokenId: action.tokenId,
    };
  }
  if (action.type === "LOGOUT") {
    return {
      isloggedin: false,
      tokenId: "",
    };
  }
};

const AuthProvider = (props) => {
  const [loginState, dispatchLoginAction] = useReducer(
    loginReducer,
    defaultState
  );

  const login = (tokenId) => {
    dispatchLoginAction({ type: "LOGIN", tokenId: tokenId });
    localStorage.setItem("token", tokenId);
  };

  const logout = () => {
    dispatchLoginAction({ type: "LOGOUT" });
    localStorage.removeItem("token");
  };

  const authContext = {
    tokenId: loginState.tokenId,
    isloggedin: loginState.isloggedin,
    login: login,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
