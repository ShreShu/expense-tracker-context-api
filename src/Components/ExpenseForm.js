import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Store/AuthContext";
import { formatEmail } from "../Util/UserNameFormat";
import "./ExpenseForm.css";
const ExpenseForm = ({ edit, expenseId, setEdit }) => {
  const userEmail = formatEmail(localStorage.getItem("userMail"));
  const authCtx = useContext(AuthContext);
  const [description, setDescription] = useState("");
  const [money, setMoney] = useState("");
  const [category, setCategory] = useState("");

  const resetForm = () => {
    setEdit(false);
    setCategory("");
    setMoney("");
    setDescription("");
  };

  useEffect(() => {
    if (edit) {
      axios
        .get(
          `https://expense-tracker-4a29f-default-rtdb.firebaseio.com/${userEmail}/${expenseId}.json`
        )
        .then((res) => {
          console.log(res);
          setCategory(res.data.category);
          setMoney(res.data.money);
          setDescription(res.data.description);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [edit]);
  const descriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const moneyChange = (e) => {
    setMoney(e.target.value);
  };
  const categoryChange = (e) => {
    console.log(e.target.value);
    setCategory(e.target.value);
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (edit) {
      axios
        .put(
          `https://expense-tracker-4a29f-default-rtdb.firebaseio.com/${userEmail}/${expenseId}.json`,
          {
            money,
            category,
            description,
          }
        )
        .then((res) => {
          resetForm();
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
          // {FIXME: Remove unnecessary add expense in state after update of expanse}
        })
        .catch((error) => {
          console.log(error);
        });
    } //  console.log({ category, money, description });
    if (!edit) {
      axios
        .post(
          `https://expense-tracker-4a29f-default-rtdb.firebaseio.com/${userEmail}.json`,
          {
            money,
            category,
            description,
          }
        )
        .then((res) => {
          console.log(res);
          const key = res.data.name;
          resetForm();
          authCtx.addexpense({ money, category, description, key });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className="expense">
      <form className="expense-form" onSubmit={formSubmitHandler}>
        <h3 className="expense-heading">Add Expense</h3>
        <div className="form-group">
          <label htmlFor="money">Money Spent</label>
          <input
            type="number"
            className="form-control from-control-sm"
            id="money"
            aria-describedby="emailHelp"
            placeholder="Enter Amount"
            onChange={moneyChange}
            value={money}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control from-control-sm"
            id="description"
            placeholder="description"
            onChange={descriptionChange}
            value={description}
            required
          />
        </div>
        <div className="form-group">
          <select
            className="custom-select"
            onFocus={categoryChange}
            onChange={categoryChange}
            required
            value={category}
          >
            <option value="others">Category</option>
            <option value="food">Food</option>
            <option value="petrol">Petrol</option>
            <option value="salary">Salary</option>
          </select>
        </div>

        <button className="btn btn-primary btn-sm">
          {edit ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
