import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatEmail } from "../Util/UserNameFormat";
import Expenses from "./Expenses";

const ExpenseList = ({ deleteEx, editEx }) => {
  const expensesList = useSelector((state) => state.expenses);

  const [expenses, setExpenses] = useState([]);
  const userEmail = formatEmail(localStorage.getItem("userMail"));

  useEffect(() => {
    axios
      .get(
        `https://expense-tracker-4a29f-default-rtdb.firebaseio.com/${userEmail}.json`
      )
      .then((res) => {
        let arrayOfObj = Object.keys(res.data)?.map((key) => {
          return { ...res.data[key], key };
        });

        setExpenses(arrayOfObj);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [expensesList]);

  return (
    <div>
      {expenses?.map((expense) => {
        return (
          <Expenses
            key={expense.key}
            id={expense.key}
            money={expense.money}
            description={expense.description}
            category={expense.category}
            deleteEx={deleteEx}
            editEx={editEx}
          />
        );
      })}
    </div>
  );
};

export default ExpenseList;
