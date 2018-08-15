import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getFolders, clearFolders, deleteFolder} from "../../store/actions/folder";
import {getLists, deleteList} from "../../store/actions/todoList";
import {logoutUser} from "../../store/actions/auth";
import {createMessage} from "../../store/actions/message";
import DesktopContent from "../../components/todoDesktop/DesktopContent/DesktopContent";
import Folder from "../../components/todoDesktop/Folder/Folder";
import ItemForm from "../ItemForm/ItemForm";
import Loader from "../../components/UI/Loader/Loader";
import Confirmation from "../../components/UI/Confirmation/Confirmation";
import actionTypes from "../../store/actions/actionTypes";
import {findByProp, getQueries} from "../../helpers";

class Desktop extends Component{
   state = {
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
   }

   componentDidUpdate(prevProps){
      const {location, folders, todos, message, sorting} = this.props,
            {openFolderId, showItemForm, isLoading, confirmation} = this.state;
            
      this.checkToken();
      if((prevProps.sorting.label !== sorting.label) || prevProps.location !== location) return this.getItems();

      //Close itemForm || openFolder, if an error ocurred
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
      //NEED TO REMOVE THIS ONE, DOES EXACTLY THE SAME THING AS THE ONE ABOVE
      else if(isLoading && ((folders && prevProps.folders !== folders) || (todos && prevProps.todos !== todos))) return this.setState({isLoading: false});
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
      const {sorting, location, folders, todos, itemsType, onFoldersGet, onFoldersClear, onTodosGet, onTodosClear} = this.props,
            pageParam = Number(getQueries(location.search).page) || 1, 
            action = (itemsType === "folder") 
                   ? () => {
                      if(todos) onTodosClear();
                      onFoldersGet(sorting.property, sorting.order, pageParam)} 
                   : () => {
                      if(folders) onFoldersClear();
                      onTodosGet(sorting.property, sorting.order, pageParam)};

      this.setState({isLoading: true}, action);
   };

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
      const {isLoading, openFolderId, showItemForm, itemToEdit, confirmation} = this.state,
            {itemsType, currentFolder, message} = this.props,
            content = isLoading ? <Loader /> : <DesktopContent itemsType={itemsType} newFormHandler={this.itemFormHandler} settingsHandler={this.settingsHandler} deleteHandler={this.deleteConfHandler} />;

      //REMOVE INLINE STYLES
      return (
         <div>
            <h1 style={{fontSize: "3em", fontFamily: 'Alegreya'}}>
               Todos Desktop
            </h1>
            {content}
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
   message: state.message.label,
   sorting: state.sorting
});

const mapDispatchToProps = dispatch => ({
   onFoldersGet: (sortProp, sortOrder, pageNum) => dispatch(getFolders(sortProp, sortOrder, pageNum)),
   onFoldersClear: () => dispatch(clearFolders()),
   onFolderDelete: (folderId, keep) => dispatch(deleteFolder(folderId, keep)),
   onTodosGet: (sortProp, sortOrder, pageNum) => dispatch(getLists(sortProp, sortOrder, pageNum)),
   onTodosClear: () => dispatch({type: actionTypes.CLEAR_LIST}),
   onTodosDelete: (listId, inFolder) => dispatch(deleteList(listId, inFolder)),
   onUserLogout: () => dispatch(logoutUser()),
   onMessageCreate: (type, message) => dispatch(createMessage(type, message))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Desktop));