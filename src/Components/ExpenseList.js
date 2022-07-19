import React, { useContext } from "react";
import AuthContext from "../Store/AuthContext";
import Expenses from "./Expenses";

const ExpenseList = () => {
  const authCtx = useContext(AuthContext);
  console.log(authCtx.expenses);
  return (
    <div>
      {authCtx.expenses.map((expense) => {
        return (
          <Expenses
            money={expense.money}
            description={expense.description}
            category={expense.category}
          />
        );
      })}
    </div>
  );
};

export default ExpenseList;
