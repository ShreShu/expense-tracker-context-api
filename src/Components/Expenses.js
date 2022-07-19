import React from "react";
import "./Expenses.css";
const Expenses = ({ money, description, category }) => {
  return (
    <div className="expenses">
      <div className="expenses__item">{category}</div>
      <div className="expenses__item">{description}</div>
      <div className="expenses__item">{`Rs ${money}`}</div>
    </div>
  );
};

export default Expenses;
