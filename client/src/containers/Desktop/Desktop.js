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
import "./Desktop.css";

class Desktop extends Component{
   state = {
      openFolderId: null,
      itemToEdit: null,
      showItemForm: false,
      confirmation: {
         deleteConfirm: false,
         keepItemsConfirm: false,
         isLoading: false
      }
   };

   componentDidMount(){
      console.log("desktop mounted");
      this.checkToken();
   }

   componentDidUpdate(prevProps){
      const {message} = this.props,
            {showItemForm, confirmation, openFolderId} = this.state;
            
      this.checkToken();

      //Close itemForm || openFolder, if an error ocurred
      if(prevProps.message !== message){
         if(showItemForm) return this.setState({showItemForm: false, itemToEdit: null});
         else if(openFolderId) return this.openFolderHandler();
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

   checkToken = () => {
      const tokenExp = localStorage.getItem("tokenExp"),
            currentTime = Date.now(),
            {onUserLogout, onMessageCreate} = this.props;

      if(tokenExp && Number(tokenExp) <= currentTime){
         onUserLogout();
         onMessageCreate("Notification", "Your token is no longer valid, you must relog");
      }
   }

   openFolderHandler = folderId => this.setState({openFolderId: folderId || null});

   itemFormHandler = () => this.setState(prevState => ({showItemForm: !prevState.showItemForm, itemToEdit: null}));

   settingsHandler = payload => {this.setState(prevState => ({itemToEdit: prevState.itemToEdit ? null : payload, showItemForm: true}))};

   hideConfirmation = () => {this.setState(prevState => ({itemToEdit: null, confirmation: {...prevState.confirmation, deleteConfirm: false, keepItemsConfirm: false}}))};
   
   deleteConfHandler = payload => this.setState(prevState => ({itemToEdit: payload, confirmation: {...prevState.confirmation, deleteConfirm: true}}));
   
   deleteItemHandler = () => {
      const {itemToEdit} = this.state,
            {folders} = this.props;

      //Check if the keep files message is needed
      if((itemToEdit.type === "folder") && findByProp("_id", itemToEdit._id, folders).files.length) return this.setState(prevState => ({confirmation: {...prevState.confirmation, deleteConfirm: false, keepItemsConfirm: true}}));
      return this.setState(prevState => ({confirmation: {...prevState.confirmation, isLoading: true}}), this.removeItemHandler);
   }

   removeItemHandler = keep => {
      const {currentFolder, onFolderDelete, onTodosDelete} = this.props,
            {itemToEdit} = this.state;

      if(itemToEdit.type === "folder") return this.setState(prevState => ({confirmation: {...prevState.confirmation, isLoading: true}}), () => onFolderDelete(itemToEdit._id, keep));
      return onTodosDelete(itemToEdit._id, !!currentFolder);  
   }

   render(){
      const {openFolderId, itemToEdit, showItemForm, confirmation} = this.state,
            {itemsType} = this.props;

      return (
         <div className="Desktop">
            <h1>
               Todos Desktop
            </h1>
            <DesktopContent itemsType={itemsType} openFolderHandler={this.openFolderHandler} newFormHandler={this.itemFormHandler} settingsHandler={this.settingsHandler} deleteHandler={this.deleteConfHandler} />
            <DesktopPopups itemToEdit={itemToEdit} itemsType={itemsType} openFolderId={openFolderId} showItemForm={showItemForm}
                           confirmation={confirmation} folderHandler={this.openFolderHandler} itemFormHandler={this.itemFormHandler} 
                           settingsHandler={this.settingsHandler} deleteConfHandler={this.deleteConfHandler} hideConfirmation={this.hideConfirmation}
                           deleteItemHandler={this.deleteItemHandler} removeItemHandler= {this.removeItemHandler} />
         </div>
      );
   }
}

const mapStateToProps = state => ({
   currentFolder: state.folder.current,
   folders: state.folder.list,
   todos: state.todoList.lists,
   message: state.message.label,
});

const mapDispatchToProps = dispatch => ({
   onFolderDelete: (folderId, keep) => dispatch(deleteFolder(folderId, keep)),
   onTodosDelete: (listId, inFolder) => dispatch(deleteList(listId, inFolder)),
   onUserLogout: () => dispatch(logoutUser()),
   onMessageCreate: (type, message) => dispatch(createMessage(type, message))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Desktop));