import React, {Fragment} from "react";
import Button from "../../UI/Button/Button";
import InputField from "../../UI/InputField/InputField";
import Options from "../../UI/Options/Options";
import {capitalizeWord} from "../../../helpers";

const NewItemForm = props => {
   const {itemType, openFolderName, folderNames, updateInput, submitHandler, ...newItemData} = props,
         inputs = {
            name: {
               value: newItemData.name,
               type: "text",
               maxLength: "14",
               placeholder: `${capitalizeWord(itemType)}'s Name`
            },
            image: {
               value: newItemData.image,
               type: "text",
               placeholder: `${capitalizeWord(itemType)}'s Image Url`
            }
         };

   let itemDescription = openFolderName && `Belongs to the folder: ${openFolderName}`;
   if(!itemDescription){
      if(itemType === "todo") itemDescription = <Options name="folderName" selected={newItemData.folderName} label="Belonging Folder" pickOption={updateInput} optionList={folderNames} emptyOption="-- No Folder --" />;
      else itemDescription = (
         <Fragment>
            <label> Description: </label>
            <textarea name="description" onChange={updateInput} value={newItemData.description} maxLength="45" />
         </Fragment>
      );
   }

   
   return (
      <form onSubmit={submitHandler}>
         <h3> New {itemType} form </h3> 
         <InputField input={inputs.name} updateHandler={updateInput}>
            Name
         </InputField>
         <InputField input={inputs.image} updateHandler={updateInput}>
            Image
         </InputField>
         {itemDescription}
         <Button design="submit"> Submit </Button>
      </form>
   );
}

export default NewItemForm;