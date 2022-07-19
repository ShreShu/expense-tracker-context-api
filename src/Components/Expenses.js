import React from "react";
import "./Expenses.css";
const Expenses = ({ id, money, description, category, deleteEx, editEx }) => {
  return (
    <div className="expenses">
      <div className="expenses__item">{category}</div>
      <div className="expenses__item">{description}</div>
      <div className="expenses__item">{`Rs ${money}`}</div>
      <div className="expenses__item">
        <button
          onClick={() => {
            deleteEx(id);
          }}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
        <button
          onClick={() => {
            editEx(id);
          }}
          className="btn btn-success btn-sm"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Expenses;
