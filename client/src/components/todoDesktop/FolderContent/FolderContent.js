import React from "react";
import IconList from "../IconList/IconList";
import Button from "../../UI/Button/Button";

const FolderContent = props => {
   const {files, folderName, newFormToggle, settingsHandler, deleteHandler} = props,
         content = files && files.length ? <IconList todos={files} settingsHandler={settingsHandler} deleteHandler={deleteHandler} insideFolder /> 
                                         : <h4> The folder is empty </h4>;

   return (
      <div>
         <Button action={newFormToggle} design="toggler">
            New List
         </Button>
         <h2>
            {folderName}
         </h2>
         {content}
      </div>
   )
};

export default FolderContent;