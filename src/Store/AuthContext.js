import React, { createContext, useContext } from "react";
const AuthContext = createContext({
  isloggedin: false,
  tokenId: "",
  login: (token) => {},
  logout: () => {},
});
export default AuthContext;
