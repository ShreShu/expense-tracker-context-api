import React, { useContext, useState } from "react";
import AuthContext from "../Store/AuthContext";
import { NavLink } from "react-router-dom";
import "./HomePage.css";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import axios from "axios";
import { formatEmail } from "../Util/UserNameFormat";

const HomePage = () => {
  const authCtx = useContext(AuthContext);
  const userEmail = formatEmail(localStorage.getItem("userMail"));
  const [expenseId, setExpenseId] = useState();
  const [edit, setEdit] = useState(false);
  const deleteEx = async (id) => {
    const deleted = axios.delete(
      `https://expense-tracker-4a29f-default-rtdb.firebaseio.com/${userEmail}/${id}.json`
    );

    axios
      .get(
        `https://expense-tracker-4a29f-default-rtdb.firebaseio.com/${userEmail}.json`
      )
      .then((res) => {
        console.log(res);
        let arrayOfObj = Object.keys(res.data)?.map((key) => {
          return { ...res.data[key], key };
        });
        authCtx.updateAllExp(arrayOfObj);
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
