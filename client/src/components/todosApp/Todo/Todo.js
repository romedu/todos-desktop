import React from "react";
import Button from "../../UI/Button/Button";
import "./Todo.css";

const Todo = ({description, checked, checkHandler, deleteHandler}) => {
   return (
      <li className={checked ? "checkedTodo" : ""} onClick={checkHandler}>
         {description}
         <Button action={deleteHandler}> X </Button>
      </li>
   );
};

export default Todo;