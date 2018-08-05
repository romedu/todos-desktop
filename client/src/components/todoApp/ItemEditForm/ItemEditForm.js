import React from "react";
import Button from "../../UI/Button/Button";
import InputField from "../../UI/InputField/InputField";
import Options from "../../UI/Options/Options";
import {capitalizeWord} from "../../../helpers";

const ItemEditForm = props => {
   const {itemType, folderNames, updateInput, submitHandler, ...itemData} = props;
   let itemDescription = (itemType === "todo") ? <Options name="folderName" label="Belonging Folder" pickOption={updateInput} optionList={folderNames} emptyOption="-- No Folder --" selected={itemData.folderName} /> 
                                               : (
                                                   <span>
                                                      <label> Description: </label>
                                                      <textarea name="description" value={itemData.description} onChange={updateInput} />
                                                   </span>
                                               );
   return (
      <form onSubmit={submitHandler}>
         <h3> Edit {capitalizeWord(itemType)} </h3> 
         <InputField type="text" updateHandler={updateInput} value={itemData.name}>
            Name
         </InputField>
         <InputField type="text" updateHandler={updateInput} value={itemData.image}>
            Image
         </InputField>
         {itemDescription}
         <Button> Update {itemType} </Button>
      </form>
   );
}

export default ItemEditForm;