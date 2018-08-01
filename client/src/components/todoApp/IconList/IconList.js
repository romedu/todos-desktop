import React from "react";
import DisplayIcon from "../DisplayIcon/DisplayIcon";
import "./IconList.css";

//COMBINE ALL THE ITEM PROP INTO ONE SINGLE OBJECT
const IconList = ({folders, todos, desktop, displaying, openHandler, settingsHandler, deleteHandler, insideFolder}) => {
   const folderList = folders && folders.length && (displaying === "folder")
                    ? folders.map(folder => <DisplayIcon key={folder._id} id={folder._id} image={folder.image} description={folder.description} type="folder" openHandler={openHandler} name={folder.name} settingsHandler={settingsHandler} deleteHandler={deleteHandler} />)
                    : null;
   const filteredTodos = todos && todos.length && desktop ? todos.filter(todo => !todo.folderName) : todos;
   const todosList = filteredTodos && filteredTodos.length && (displaying === "todo" || insideFolder)
                   ? filteredTodos.map(todo => <DisplayIcon key={todo._id} id={todo._id} image={todo.image} type="todo" url={`/todos/${todo._id}`} name={todo.name} folderName={todo.folderName} settingsHandler={settingsHandler} deleteHandler={deleteHandler} />)
                   : null;
               
   return (
      <ul className="IconList">
         {(todosList && !insideFolder) ? <li><h3> Todolists </h3></li> : null}
         <div> {todosList} </div>
         {desktop && folders && folders.length && (displaying === "folder") ? <li><h3> Folders </h3></li> : null}
         <div> {folderList} </div>
      </ul>
   )
};

export default IconList;