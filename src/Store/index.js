import React, { useReducer } from "react";
import { createStore } from "redux";

const defaultState = {
  isloggedin: false,
  tokenId: "",
  expenses: [],
};

const loginReducer = (state = defaultState, action) => {
  if (action.type === "LOGIN") {
    return {
      ...state,
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

  if (action.type === "ADD_EXPENSE") {
    let updatedExpense = [...state.expenses, action.expenseItem];
    console.log(updatedExpense);
    return {
      ...state,
      expenses: updatedExpense,
    };
  }
  if (action.type === "UPDATE_EXPENSE") {
    let updatedExpense = action.expenseItems;
    return {
      ...state,
      expenses: updatedExpense,
    };
  }
  return defaultState;
};

const store = createStore(loginReducer);

export default store;
