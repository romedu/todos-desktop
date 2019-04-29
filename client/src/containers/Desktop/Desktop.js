import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {deleteFolder} from "../../store/actions/folder";
import {deleteList} from "../../store/actions/todoList";
import {logoutUser} from "../../store/actions/auth";
import {createMessage} from "../../store/actions/message";
import DesktopContent from "../../components/todoDesktop/DesktopContent/DesktopContent";
import DesktopPopups from "../../components/todoDesktop/DesktopPopups/DesktopPopups";
import {findByProp} from "../../helpers";
import withTokenVerification from "../../hoc/withTokenVerification";
import "./Desktop.css";

class Desktop extends Component{
   state = {
      folderDisplaying: null, // Folder showing in the folder's component
      itemToEdit: null, // Item selected for update
      showItemForm: false, // Display for the new item or edit item form
      confirmation: {
         deleteConfirm: false,
         keepItemsConfirm: false,
         isLoading: false
      }
   };

   componentDidUpdate(prevProps){
      const {message} = this.props,
            {showItemForm, confirmation, folderDisplaying} = this.state;

      // If an error were to occur close the component that caused it, either the itemForm or the folderDisplaying 
      if(prevProps.message && !message){
         if(showItemForm) return this.setState({showItemForm: false, itemToEdit: null});
         else if(!showItemForm && folderDisplaying) return this.displayFolderHandler();
      }

      //Close delete confirmation after its action is completed
      if(confirmation.isLoading && (prevProps !== this.props)){
         return this.setState({
                  itemToEdit: null,
                  confirmation: {
                     isLoading: false, 
                     deleteConfirm: false, 
                     keepItemsConfirm: false
                  }
               });
      }
   }

   // Updates the displaying folder state
   displayFolderHandler = folderId => this.setState({folderDisplaying: folderId || null});

   itemFormHandler = () => this.setState(prevState => ({showItemForm: !prevState.showItemForm, itemToEdit: null}));

   settingsHandler = payload => {this.setState(prevState => ({itemToEdit: prevState.itemToEdit ? null : payload, showItemForm: true}))};

   hideConfirmation = () => {this.setState(prevState => ({itemToEdit: null, confirmation: {...prevState.confirmation, deleteConfirm: false, keepItemsConfirm: false}}))};
   
   deleteConfHandler = payload => this.setState(prevState => ({itemToEdit: payload, confirmation: {...prevState.confirmation, deleteConfirm: true}}));
   
   deleteItemHandler = () => {
      const {itemToEdit} = this.state,
            {folders} = this.props;

      // If the item to delete is a folder and it contains todos, the keep files message is displayed
      if((itemToEdit.type === "folder") && findByProp("_id", itemToEdit._id, folders).files.length) return this.setState(prevState => ({confirmation: {...prevState.confirmation, deleteConfirm: false, keepItemsConfirm: true}}));
      return this.setState(prevState => ({confirmation: {...prevState.confirmation, isLoading: true}}), this.removeItemHandler);
   }

   removeItemHandler = keep => {
      const {onFolderDelete, onTodosDelete} = this.props,
            {itemToEdit, folderDisplaying} = this.state;

      if(itemToEdit.type === "folder") return this.setState(prevState => ({confirmation: {...prevState.confirmation, isLoading: true}}), () => onFolderDelete(itemToEdit._id, keep));
      return onTodosDelete(itemToEdit._id, !!folderDisplaying);  
   }

   render(){
      const {folderDisplaying, itemToEdit, showItemForm, confirmation} = this.state,
            {itemsType} = this.props;

      return (
         <div className="Desktop">
            <h1>
               Todos Desktop
            </h1>
            <DesktopContent itemsType={itemsType} openFolderHandler={this.displayFolderHandler} 
                            newFormHandler={this.itemFormHandler} settingsHandler={this.settingsHandler} deleteHandler={this.deleteConfHandler} />
            <DesktopPopups itemToEdit={itemToEdit} itemsType={itemsType} folderDisplaying={folderDisplaying} showItemForm={showItemForm}
                           confirmation={confirmation} folderHandler={this.displayFolderHandler} itemFormHandler={this.itemFormHandler} 
                           settingsHandler={this.settingsHandler} deleteConfHandler={this.deleteConfHandler} hideConfirmation={this.hideConfirmation}
                           deleteItemHandler={this.deleteItemHandler} removeItemHandler= {this.removeItemHandler} />
         </div>
      );
   }
}

const mapStateToProps = state => ({
   todos: state.todoList.lists, // Needed to update the props when removing a todoList
   folders: state.folder.list,
   message: state.message.label,
});

const mapDispatchToProps = dispatch => ({
   onFolderDelete: (folderId, keep) => dispatch(deleteFolder(folderId, keep)),
   onTodosDelete: (listId, inFolder) => dispatch(deleteList(listId, inFolder)),
   onUserLogout: () => dispatch(logoutUser()),
   onMessageCreate: (label, message) => dispatch(createMessage(label, message))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withTokenVerification(Desktop)));