import React, {Fragment} from "react";
import {connect} from "react-redux";
import Folder from "../Folder/Folder";
import ItemForm from "../../../containers/ItemForm/ItemForm";
import Confirmation from "../../UI/Confirmation/Confirmation";

const DesktopPopups = props => {
   const {message, currentFolder, itemToEdit, itemsType, openFolderId, showItemForm, confirmation, folderHandler, itemFormHandler, settingsHandler, deleteConfHandler, hideConfirmation, deleteItemHandler, removeItemHandler} = props;
   return (
      <Fragment>
         {openFolderId && !message && <Folder folderId={openFolderId} closeHandler={folderHandler} newFormToggle={itemFormHandler} settingsHandler={settingsHandler} deleteHandler={deleteConfHandler} />}
         {showItemForm && !message && <ItemForm itemType={itemToEdit ? itemToEdit.type : itemsType} itemToEdit={itemToEdit} folderHandler={folderHandler} closeHandler={itemFormHandler} />}
         {confirmation.deleteConfirm && <Confirmation isLoading={confirmation.isLoading} closeHandler={hideConfirmation} deleteHandler={deleteItemHandler} slightDrop={!!currentFolder}>
            Do you really want to delete the {itemToEdit.name} {itemToEdit.type}? 
         </Confirmation>}
         {confirmation.keepItemsConfirm && <Confirmation isLoading={confirmation.isLoading} deleteHandler={() => removeItemHandler(true)} negationHandler={() => removeItemHandler(false)} closeHandler={hideConfirmation} slightDrop={!!currentFolder}> 
            Do you want to keep the contents of the {itemToEdit.name} {itemToEdit.type}?
         </Confirmation>}
      </Fragment>
   );
};

const mapStateToProps = state => ({
   currentFolder: state.folder.current,
   message: state.message.label,
});

export default connect(mapStateToProps)(DesktopPopups);