import React, {Fragment} from "react";
import Button from "../../UI/Button/Button";
import InputField from "../../UI/InputField/InputField";
import Options from "../../UI/Options/Options";
import {capitalizeWord} from "../../../helpers";

const ItemEditForm = props => {
   const {itemType, folderNames, updateInput, submitHandler, ...itemData} = props,
         inputs = {
            name: {
               value: itemData.name,
               type: "text",
               maxLength: "14",
               placeholder: `${capitalizeWord(itemType)}'s Name`
            },
            image: {
               value: itemData.image,
               type: "text",
               placeholder: `${capitalizeWord(itemType)}'s Image Url`
            }
         },
         formatedFolderNames = folderNames.map(folderName => ({name: folderName}));

   let itemDescription = (itemType === "todo") ? <Options name="folderName" label="Belonging Folder" pickOption={updateInput} optionList={formatedFolderNames} emptyOption="-- No Folder --" selected={itemData.folderName} /> 
                                               : (
                                                   <Fragment>
                                                      <label> Description: </label>
                                                      <textarea name="description" value={itemData.description} onChange={updateInput} maxLength="45" />
                                                   </Fragment>
                                               );
   return (
      <form onSubmit={submitHandler}>
         <h3> Edit {capitalizeWord(itemType)} </h3> 
         <InputField input={inputs.name} updateHandler={updateInput}>
            Name
         </InputField>
         <InputField input={inputs.image} updateHandler={updateInput}>
            Image
         </InputField>
         {itemDescription}
         <Button design="submit"> Update {itemType} </Button>
      </form>
   );
}

export default ItemEditForm;