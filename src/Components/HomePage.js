import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "./HomePage.css";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import axios from "axios";
import { useDispatch } from "react-redux";
import { formatEmail } from "../Util/UserNameFormat";

const HomePage = () => {
  const dispatch = useDispatch();
  const userEmail = formatEmail(localStorage.getItem("userMail"));
  const [expenseId, setExpenseId] = useState();
  const [edit, setEdit] = useState(false);
  const deleteEx = (id) => {
    axios
      .delete(
        `https://expense-tracker-4a29f-default-rtdb.firebaseio.com/${userEmail}/${id}.json`
      )
      .then((res) => {
        axios
          .get(
            `https://expense-tracker-4a29f-default-rtdb.firebaseio.com/${userEmail}.json`
          )
          .then((res) => {
            console.log(res);
            let arrayOfObj = Object.keys(res.data)?.map((key) => {
              return { ...res.data[key], key };
            });
            dispatch({
              type: "UPDATE_EXPENSE",
              expenseItems: arrayOfObj,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editEx = (id) => {
    setExpenseId(id);
    setEdit(true);
    console.log(id);
  };

  return (
    <>
      <div className="home__page">
        <div>Welcome to expense Tracker</div>
        <div>
          your profile is incomplete{" "}
          <NavLink to="/updateprofile"> Complete Now</NavLink>
        </div>
      </div>
      <ExpenseForm edit={edit} expenseId={expenseId} setEdit={setEdit} />
      <ExpenseList deleteEx={deleteEx} editEx={editEx} />
    </>
  );
};

export default HomePage;
