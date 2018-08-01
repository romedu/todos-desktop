import React from "react";
import Button from "../../UI/Button/Button";
import InputField from "../../UI/InputField/InputField";
import Options from "../../UI/Options/Options";

const NewItemForm = props => {
   const {updateInput, submitHandler, itemType, currentFolder, name, image, folderDesc, folders, todoFolder} = props;
   let itemDescription = currentFolder ? `Belongs to the folder: ${currentFolder.name}` : null;
   if(!itemDescription && itemType === "todo") itemDescription = <Options selected={todoFolder} label="Belonging Folder" pickOption={e => updateInput("folderName", e.target.value)} optionList={folders} emptyOption="-- No Folder --" />;
   else if(!itemDescription) itemDescription = (
      <span>
         <label> Description: </label>
         <textarea onChange={e => updateInput("description", e.target.value)} value={folderDesc} />
      </span>
   );

   return (
      <form onSubmit={submitHandler}>
         <h3> New {itemType} form </h3> 
         <InputField type="text" updateHandler={updateInput} value={name}>
            Name
         </InputField>
         <InputField type="text" updateHandler={updateInput} value={image}>
            Image
         </InputField>
         {itemDescription}
         <Button> Submit </Button>
      </form>
   );
}

export default NewItemForm;