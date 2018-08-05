import React from "react";
import Button from "../../UI/Button/Button";
import InputField from "../../UI/InputField/InputField";
import Options from "../../UI/Options/Options";

const NewItemForm = props => {
   const {itemType, openFolderName, folderNames, updateInput, submitHandler, ...newItemData} = props;
   let itemDescription = openFolderName && `Belongs to the folder: ${openFolderName}`;
   if(!itemDescription){
      if(itemType === "todo") itemDescription = <Options name="folderName" selected={newItemData.folderName} label="Belonging Folder" pickOption={updateInput} optionList={folderNames} emptyOption="-- No Folder --" />;
      else itemDescription = (
         <span>
            <label> Description: </label>
            <textarea name="description" onChange={updateInput} value={newItemData.description} />
         </span>
      );
   }
   
   return (
      <form onSubmit={submitHandler}>
         <h3> New {itemType} form </h3> 
         <InputField type="text" updateHandler={updateInput} value={newItemData.name}>
            Name
         </InputField>
         <InputField type="text" updateHandler={updateInput} value={newItemData.image}>
            Image
         </InputField>
         {itemDescription}
         <Button> Submit </Button>
      </form>
   );
}

export default NewItemForm;