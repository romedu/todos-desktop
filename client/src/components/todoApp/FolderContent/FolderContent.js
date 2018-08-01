import React from "react";
import IconList from "../IconList/IconList";
import ButtonGroup from "../../UI/ButtonGroup/ButtonGroup";

const FolderContent = props => {
   const {files, children, newFormToggle, settingsHandler, deleteHandler} = props;
   const content = files && files.length ? <IconList todos={files} settingsHandler={settingsHandler} deleteHandler={deleteHandler} insideFolder /> : <h4> The folder is empty </h4>;
   const buttons = [
      {
         text: "New List",
         action: newFormToggle
      },
      {
         text: "Edit Mode"
      }
   ];
   return (
      <div>
         <ButtonGroup buttons={buttons} small />
         <h2> {children} </h2>
         {content}
      </div>
   )
};

export default FolderContent;