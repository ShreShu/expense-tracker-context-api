import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Store/AuthContext";
import { formatEmail } from "../Util/UserNameFormat";
import Expenses from "./Expenses";

const ExpenseList = () => {
  const authCtx = useContext(AuthContext);

  const [expenses, setExpenses] = useState([]);
  const userEmail = formatEmail(localStorage.getItem("userMail"));

  useEffect(() => {
    axios
      .get(
        `https://expense-tracker-4a29f-default-rtdb.firebaseio.com/${userEmail}.json`
      )
      .then((res) => {
        let arrayOfObj = Object.keys(res.data)?.map((key) => {
          return res.data[key];
        });
        console.log(arrayOfObj);
        setExpenses(arrayOfObj);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [authCtx.expenses]);

  return (
    <div>
      {expenses?.map((expense) => {
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
