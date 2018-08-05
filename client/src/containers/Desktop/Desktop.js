import React, {Component} from "react";
import {connect} from "react-redux";
import {getFolders, clearFolders, deleteFolder} from "../../store/actions/folder";
import {getLists, deleteList} from "../../store/actions/todoList";
import {logoutUser} from "../../store/actions/auth";
import {createMessage} from "../../store/actions/message";
import ButtonGroup from "../../components/UI/ButtonGroup/ButtonGroup";
import IconList from "../../components/todoApp/IconList/IconList";
import Folder from "../../components/todoApp/Folder/Folder";
import ItemForm from "../ItemForm/ItemForm";
import Loader from "../../components/UI/Loader/Loader";
import Confirmation from "../../components/UI/Confirmation/Confirmation";
import actionTypes from "../../store/actions/actionTypes";
import {findById} from "../../helpers";

class Desktop extends Component{
   state = {
      itemsType: "folder",
      openFolderId: null,
      isLoading: false,
      itemToEdit: null,
      showItemForm: false,
      confirmation: {
         deleteConfirm: false,
         keepItemsConfirm: false,
         isLoading: false
      }
   };

   componentDidMount(){
      this.checkToken();
      this.getItems();
   }

   componentDidUpdate(prevProps, prevState){
      const {folders, todos, message} = this.props,
            {openFolderId, showItemForm, itemsType, isLoading, confirmation} = this.state;

      this.checkToken();
      if(prevState.itemsType !== itemsType) return this.getItems();

      //Close itemForm or openFolder if an error ocurred
      if(prevProps.message !== message){
         if(showItemForm) return this.setState({showItemForm: false, itemToEdit: null});
         else if(openFolderId) return this.setState({openFolder: null});
      }
      //Close delete confirmation after its action is completed
      else if(confirmation.isLoading && (prevProps !== this.props)){
         return this.setState({
                  confirmation: {
                     isLoading: false, 
                     deleteConfirm: false, 
                     keepItemsConfirm: false
                  }
               });
      }
      else if(isLoading && ((!prevProps.folders && folders) || (!prevProps.todos && todos))) return this.setState({isLoading: false});
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

   getItems = () => {
      const {itemsType} = this.state,
            {onFoldersGet, onFoldersClear, onTodosGet, onTodosClear} = this.props,
            action = (itemsType === "folder") 
                   ? () => {onTodosClear(); onFoldersGet();} 
                   : () => {onFoldersClear(); onTodosGet();};

      this.setState({isLoading: true}, action);
   };

   itemsTypeHandler = itemsType => this.setState(prevState => {
      if(prevState.itemsType === itemsType) return null;
      return {itemsType};
   });
   openFolderHandler = folderId => this.setState({openFolderId: folderId || null}); 
   itemFormHandler = () => this.setState(prevState => ({showItemForm: !prevState.showItemForm, itemToEdit: null}));
   settingsHandler = payload => {this.setState(prevState => ({itemToEdit: prevState.itemToEdit ? null : payload, showItemForm: true}))};
   hideConfirmation = () => {this.setState(prevState => ({itemToEdit: null, confirmation: {...prevState.confirmation, deleteConfirm: false, keepItemsConfirm: false}}))};
   deleteConfHandler = payload => this.setState(prevState => ({itemToEdit: payload, confirmation: {...prevState.confirmation, deleteConfirm: true}}));
   deleteItemHandler = () => {
      const {itemToEdit} = this.state,
            {folders} = this.props;

      //Check if the keep content message is needed
      if(itemToEdit.type === "folder" && (findById(itemToEdit._id, folders).files.length)) return this.setState(prevState => ({confirmation: {...prevState.confirmation, deleteConfirm: false, keepItemsConfirm: true}}));
      return this.setState(prevState => ({confirmation: {...prevState.confirmation, isLoading: true}}), this.removeItemHandler);
   }

   removeItemHandler = keep => {
      const {currentFolder, onFolderDelete, onTodosDelete} = this.props,
            {itemToEdit} = this.state;

      if(itemToEdit.type === "folder") return this.setState(prevState => ({confirmation: {...prevState.confirmation, isLoading: true}}), () => onFolderDelete(itemToEdit._id, keep));
      return onTodosDelete(itemToEdit._id, !!currentFolder);  
   }

   render(){
      const {itemsType, isLoading, openFolderId, showItemForm, itemToEdit, confirmation} = this.state,
            {folders, todos, currentFolder, message} = this.props,
            buttons = [
               {
                  description: "Create Item",
                  action: this.itemFormHandler
               },
               {
                  description: "Folders",
                  action: () => this.itemsTypeHandler("folder")
               },
               {
                  description: "TodoLists",
                  action: () => this.itemsTypeHandler("todo")
               }
            ];
      const itemList = ((folders && folders.length) || (todos && todos.length))
                     ? <IconList folders={folders} todos={todos} openHandler={this.openFolderHandler} settingsHandler={this.settingsHandler} deleteHandler={this.deleteConfHandler} />
                     : <h4> Your desktop is empty, *** SAD FACE *** </h4>;

      //REMOVE INLINE STYLES
      return (
         <div>
            <h1 style={{fontSize: "3em", fontFamily: 'Alegreya'}}>
               Todos Desktop
            </h1>
            {!isLoading && <ButtonGroup buttons={buttons} />}
            {isLoading ? <Loader /> : itemList}
            {openFolderId && !message && <Folder folderId={openFolderId} closeHandler={this.openFolderHandler} newFormToggle={this.itemFormHandler} settingsHandler={this.settingsHandler} deleteHandler={this.deleteConfHandler} />}
            {showItemForm && !message && <ItemForm itemType={itemToEdit ? itemToEdit.type : itemsType} itemToEdit={itemToEdit} folderHandler={this.openFolderHandler} closeHandler={this.itemFormHandler} />}
            {confirmation.deleteConfirm && <Confirmation isLoading={confirmation.isLoading} closeHandler={this.hideConfirmation} deleteHandler={this.deleteItemHandler} slightDrop={!!currentFolder}>
               Do you really want to delete the {itemToEdit.name} {itemToEdit.type}? 
            </Confirmation>}
            {confirmation.keepItemsConfirm && <Confirmation isLoading={confirmation.isLoading} deleteHandler={() => this.removeItemHandler(true)} negationHandler={() => this.removeItemHandler(false)} closeHandler={this.hideConfirmation} slightDrop={!!currentFolder}> 
               Do you want to keep the contents of the {itemToEdit.name} {itemToEdit.type}?
            </Confirmation>}
         </div>
      );
   }
}

const mapStateToProps = state => ({
   currentFolder: state.folder.current,
   folders: state.folder.list,
   todos: state.todoList.lists,
   message: state.message.label
});

const mapDispatchToProps = dispatch => ({
   onFoldersGet: () => dispatch(getFolders()),
   onFoldersClear: () => dispatch(clearFolders()),
   onFolderDelete: (folderId, keep) => dispatch(deleteFolder(folderId, keep)),
   onTodosGet: () => dispatch(getLists()),
   onTodosClear: () => dispatch({type: actionTypes.CLEAR_LIST}),
   onTodosDelete: (listId, inFolder) => dispatch(deleteList(listId, inFolder)),
   onUserLogout: () => dispatch(logoutUser()),
   onMessageCreate: (type, message) => dispatch(createMessage(type, message))
});

export default connect(mapStateToProps, mapDispatchToProps)(Desktop);