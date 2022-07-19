import React, { useContext, useState } from "react";
import AuthContext from "../Store/AuthContext";
import "./ExpenseForm.css";
const ExpenseForm = () => {
  const authCtx = useContext(AuthContext);
  const [description, setDescription] = useState("");
  const [money, setMoney] = useState("");
  const [category, setCategory] = useState("");

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
    authCtx.addexpense({ money, category, description });
    //  console.log({ category, money, description });
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
          />
        </div>
        <div className="form-group">
          <select className="custom-select" onChange={categoryChange}>
            <option selected>Category</option>
            <option value="food">Food</option>
            <option value="petrol">Petrol</option>
            <option value="salary">Salary</option>
          </select>
        </div>

        <button className="btn btn-primary btn-sm">Add</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
