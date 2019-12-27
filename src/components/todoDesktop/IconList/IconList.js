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
      <div className="IconList">
         {!insideFolder && <h3>
            {todosList && "Todolists"}
            {folders && "Folders"}
         </h3>} 
         {todosList && <ul>
            {todosList}
         </ul>}
         {folderList && <ul>
            {folderList}
         </ul>}
      </div>
   )
};

export default IconList;