import React from "react";
import Button from "../../UI/Button/Button";
import "./Todo.css";

const Todo = ({description, checked, checkHandler, deleteHandler}) => {
   return (
      <li className={`Todo ${checked ? "checkedTodo" : ""}`} onClick={checkHandler}>
         <div>
            <span>
               {description}
            </span>
            <Button action={deleteHandler} design="delete"> X </Button>
         </div>
      </li>
   );
};

export default Todo;