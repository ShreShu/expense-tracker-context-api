import React, { createContext, useContext } from "react";
const AuthContext = createContext({
  isloggedin: false,
  tokenId: "",
  login: (token) => {},
  logout: () => {},
  expenses: [],
  addexpense: () => {},
});
export default AuthContext;
