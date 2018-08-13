import React from "react";
import DisplayIcon from "../DisplayIcon/DisplayIcon";
import "./IconList.css";

const IconList = props => {
   const {folders, todos, insideFolder, openHandler, settingsHandler, deleteHandler} = props,
         folderList = folders && folders.map(folder => {
            const {files, ...folderData} = folder;
            return <DisplayIcon type="folder" key={folder._id} {...folderData} openHandler={() => openHandler(folder._id)} settingsHandler={settingsHandler} deleteHandler={deleteHandler} />
         }),
         todosList = todos && todos.map(todo => <DisplayIcon type="todo" key={todo._id} {...todo} url={`/todos/${todo._id}`} settingsHandler={settingsHandler} deleteHandler={deleteHandler} />);
               
   return (
      <ul className="IconList">
         {!insideFolder && todosList && <li>
            <h3>
               Todolists
            </h3>
         </li>}
         <div> 
            {todosList}
         </div>
         {!insideFolder && folders && <li>
            <h3> 
               Folders 
            </h3>
         </li>}
         <div> 
            {folderList}
         </div>
      </ul>
   )
};

export default IconList;