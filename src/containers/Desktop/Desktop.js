import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {deleteFolder} from "../../store/actions/folder";
import {deleteList} from "../../store/actions/todoList";
import {logoutUser} from "../../store/actions/auth";
import {createMessage} from "../../store/actions/message";
import DesktopContent from "../../components/todoDesktop/DesktopContent/DesktopContent";
import DesktopPopups from "../../components/todoDesktop/DesktopPopups/DesktopPopups";
import FoldersDisplay from "../../components/todoDesktop/FoldersDisplay/FoldersDisplay";
import {findByProp} from "../../helpers";
import withTokenVerification from "../../hoc/withTokenVerification";
import "./Desktop.css";

class Desktop extends Component{
   state = {
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
            {showItemForm, confirmation} = this.state;

      // If an error were to occur close the component that caused it, the itemForm 
      if(prevProps.message && !message){
         if(showItemForm) return this.setState({showItemForm: false, itemToEdit: null});
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

   itemFormHandler = () => this.setState(prevState => ({
      showItemForm: !prevState.showItemForm, 
      itemToEdit: null
   }));

   settingsHandler = payload => this.setState(prevState => ({
      itemToEdit: prevState.itemToEdit ? null : payload, 
      showItemForm: true
   }));


   hideConfirmation = () => this.setState(prevState => ({
      itemToEdit: null, 
      confirmation: {
         ...prevState.confirmation, 
         deleteConfirm: false, 
         keepItemsConfirm: false
      }
   }));
   
   deleteConfHandler = payload => this.setState(prevState => ({
      itemToEdit: payload, 
      confirmation: {
         ...prevState.confirmation, 
         deleteConfirm: true
      }
   }));
   
   deleteItemHandler = () => {
      const {itemToEdit} = this.state,
            {folders} = this.props;

      // If the item to delete is a folder and it contains todos, the keep files message is displayed
      if((itemToEdit.type === "folder") && findByProp("_id", itemToEdit._id, folders).files.length){
         return this.setState(prevState => ({
            confirmation: {
               ...prevState.confirmation, 
               deleteConfirm: false, 
               keepItemsConfirm: true
            }
         }));
      }
      return this.setState(prevState => ({
                  confirmation: {
                     ...prevState.confirmation, 
                     isLoading: true
                  }
               }), this.removeItemHandler);
   }

   removeItemHandler = keep => {
      const {currentFolder, onFolderDelete, onTodosDelete} = this.props,
            {itemToEdit} = this.state;

      if(itemToEdit.type === "folder"){
         return this.setState(prevState => ({
            confirmation: {
               ...prevState.confirmation, 
               isLoading: true
            }
         }), () => onFolderDelete(itemToEdit._id, keep));
      }
      return onTodosDelete(itemToEdit._id, !!currentFolder);  
   }

   render(){
      const {itemToEdit, showItemForm, confirmation} = this.state,
            {folders, itemsType} = this.props;

      return (
         <div className="Desktop">
            <h1>
               Todos Desktop
            </h1>
            <DesktopContent itemsType={itemsType} 
                            newFormHandler={this.itemFormHandler} settingsHandler={this.settingsHandler} deleteHandler={this.deleteConfHandler} />
            
            <DesktopPopups itemToEdit={itemToEdit} itemsType={itemsType} showItemForm={showItemForm} confirmation={confirmation} 
                           itemFormHandler={this.itemFormHandler} hideConfirmation={this.hideConfirmation}
                           deleteItemHandler={this.deleteItemHandler} removeItemHandler= {this.removeItemHandler} />

            <FoldersDisplay folders={folders} itemFormHandler={this.itemFormHandler} 
                            settingsHandler={this.settingsHandler} deleteHandler={this.deleteConfHandler} />   
         </div>
      );
   }
}

const mapStateToProps = state => ({
   todos: state.todoList.lists, // Needed to update the props when removing a todoList
   folders: state.folder.list,
   currentFolder: state.folder.current,
   message: state.message.label,
});

const mapDispatchToProps = dispatch => ({
   onFolderDelete: (folderId, keep) => dispatch(deleteFolder(folderId, keep)),
   onTodosDelete: (listId, inFolder) => dispatch(deleteList(listId, inFolder)),
   onUserLogout: () => dispatch(logoutUser()),
   onMessageCreate: (label, message) => dispatch(createMessage(label, message))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withTokenVerification(Desktop)));