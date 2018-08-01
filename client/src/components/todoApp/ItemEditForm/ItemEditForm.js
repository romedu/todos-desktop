import React from "react";
import Button from "../../UI/Button/Button";
import InputField from "../../UI/InputField/InputField";
import Options from "../../UI/Options/Options";

const ItemEditForm = props => {
   const {updateInput, submitHandler, itemType, name, image, folderDesc, folders, todoFolder} = props;
   let itemDescription = (itemType === "todo") ? <Options label="Belonging Folder" pickOption={e => updateInput("folderName", e.target.value)} optionList={folders} emptyOption="-- No Folder --" selected={todoFolder} /> 
                                               : (
                                                   <span>
                                                      <label> Description: </label>
                                                      <textarea onChange={e => updateInput("description", e.target.value)} value={folderDesc} />
                                                   </span>
                                               ) ;
   return (
      <form onSubmit={submitHandler}>
         <h3> Edit {name} form </h3> 
         <InputField type="text" updateHandler={updateInput} value={name}>
            Name
         </InputField>
         <InputField type="text" updateHandler={updateInput} value={image}>
            Image
         </InputField>
         {itemDescription}
         <Button> Update {itemType} </Button>
      </form>
   );
}

export default ItemEditForm;