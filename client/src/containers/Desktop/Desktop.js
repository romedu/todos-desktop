import React, {Component} from "react";
import {connect} from "react-redux";
import {getFolders, deleteFolder} from "../../store/actions/folder";
import {getLists, deleteList} from "../../store/actions/todoList";
import {logoutUser} from "../../store/actions/auth";
import {createMessage} from "../../store/actions/message";
import ButtonGroup from "../../components/UI/ButtonGroup/ButtonGroup";
import IconList from "../../components/todoApp/IconList/IconList";
import Folder from "../../components/todoApp/Folder/Folder";
import ItemForm from "../../components/todoApp/ItemForm/ItemForm";
import Loader from "../../components/UI/Loader/Loader";
import Confirmation from "../../components/UI/Confirmation/Confirmation";
import actionTypes from "../../store/actions/actionTypes";

class Desktop extends Component{
   state = {
      itemsType: "folder",
      openFolder: null,
      isLoading: false,
      selectedItem: null,
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
      const {folders, todos, message, currentFolder} = this.props,
            {openFolder, showItemForm , itemsType, isLoading, confirmation} = this.state;

      this.checkToken();
      if(prevState.itemsType !== itemsType) return this.getItems();
      else if(prevProps.message !== message){
         if(showItemForm) this.setState(prevState => ({...prevState, showItemForm: false}));
         else if(openFolder) this.setState(prevState => ({...prevState, openFolder: null}));
         else if(!message) this.setState(prevState => ({...prevState, selectedItem: null}));
      }
      //This one below is used to make sure the delete confirmation closes after its action is completed
      else if((((prevProps.folders !== folders) || (prevProps.todos !== todos)) && confirmation.isLoading) || (currentFolder && prevProps.currentFolder && (prevProps.currentFolder.files !== currentFolder.files))) this.setState(prevState => ({...prevState, confirmation: {...prevState.confirmation, isLoading: false, deleteConfirm: false, keepItemsConfirm: false}}));
      else if(((!prevProps.folders && folders) || (!prevProps.todos && todos)) && isLoading) this.setState(prevState => ({...prevState, isLoading: false}));
      // IF MY CALCULATIONS WERE CORRECT, THEN THE LIST OF FOLDERS WONT DISPLAY WHEN THE ITEMSTYPE IS EQUAL TO TODOS
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

      this.setState(prevState => ({...prevState, isLoading: true}), action);
   };

   itemsTypeHandler = itemsType => this.setState(prevState => ({...prevState, itemsType}));
   openFolderHandler = folderId => this.setState(prevState => ({...prevState, openFolder: folderId})); 
   itemFormHandler = () => this.setState(prevState => ({...prevState, showItemForm: !prevState.showItemForm, selectedItem: null}));
   settingsHandler = payload => {this.setState(prevState => ({...prevState, selectedItem: prevState.selectedItem ? null : payload, showItemForm: true}))};
   hideConfirmation = () => {this.setState(prevState => ({...prevState, selectedItem: null, confirmation: {...prevState.confirmation, deleteConfirm: false, keepItemsConfirm: false}}))};
   deleteConfHandler = payload => this.setState(prevState => ({...prevState, selectedItem: payload, confirmation: {...prevState.confirmation, deleteConfirm: true}}));
   deleteItemHandler = () => {
      const {selectedItem} = this.state,
            {folders} = this.props;
                                           //Check if there is content inside of the selectedItem if it is a folder, to know if the keepMessage is needed
      if(selectedItem.type === "folder" && (folders.find(folder => folder._id === selectedItem.id).files.length)) return this.setState(prevState => ({...prevState, confirmation: {...prevState.confirmation, deleteConfirm: false, keepItemsConfirm: true}}));
      return this.setState(prevState => ({...prevState, confirmation: {...prevState.confirmation, isLoading: true}}), this.removeItemHandler);
   }

   removeItemHandler = keep => {
      const {currentFolder, onFolderDelete, onTodosDelete} = this.props,
            {selectedItem} = this.state;

      if(selectedItem.type === "folder") return this.setState(prevState => ({...prevState, confirmation: {...prevState.confirmation, isLoading: true}}), () => onFolderDelete(selectedItem.id, keep));
      return onTodosDelete(selectedItem.id, !!currentFolder);  
   }

   render(){
      const {itemsType, isLoading, openFolder, showItemForm, selectedItem, confirmation} = this.state,
            {folders, todos, currentFolder, message} = this.props;
      const buttons = [
         {
            text: "Create Item",
            action: this.itemFormHandler
         },
         {
            text: "Folders",
            action: () => this.itemsTypeHandler("folder")
         },
         {
            text: "TodoLists",
            action: () => this.itemsTypeHandler("todo")
         }
      ];
      const itemList = ((folders && folders.length) || (todos && todos.length))
                     ? <IconList displaying={itemsType} folders={folders} todos={todos} openHandler={this.openFolderHandler} settingsHandler={this.settingsHandler} deleteHandler={this.deleteConfHandler} desktop />
                     : <h4> Your desktop is empty, *** SAD FACE *** </h4>;

      //REMOVE INLINE STYLES
      return (
         <div>
            <h1 style={{fontSize: "3em", fontFamily: 'Alegreya'}}> Todos Desktop </h1>
            {!isLoading ? <ButtonGroup buttons={buttons} /> : null}
            {isLoading ? <Loader /> : itemList}
            {openFolder && !message ? <Folder folderId={openFolder} newFormToggle={this.itemFormHandler} closeHandler={() => this.openFolderHandler(null)} settingsHandler={this.settingsHandler} deleteHandler={this.deleteConfHandler} /> : null}
            {showItemForm && !message ? <ItemForm closeHandler={this.itemFormHandler} itemType={selectedItem ? selectedItem.type : itemsType} folderHandler={this.openFolderHandler} selectedItem={selectedItem} /> : null}
            {confirmation.deleteConfirm && <Confirmation isLoading={confirmation.isLoading} closeHandler={this.hideConfirmation} deleteHandler={this.deleteItemHandler} backDropped={!!currentFolder}> Do you really want to delete the {selectedItem.name} {selectedItem.type}? </Confirmation>}
            {confirmation.keepItemsConfirm && <Confirmation isLoading={confirmation.isLoading} deleteHandler={() => this.removeItemHandler(true)} negationHandler={() => this.removeItemHandler(false)} closeHandler={this.hideConfirmation} backDropped={!!currentFolder}> 
               Do you want to keep the contents of the {selectedItem.name} {selectedItem.type}?
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
   onFoldersClear: () => dispatch({type: actionTypes.CLEAR_FOLDERS}),
   onFolderDelete: (folderId, keep) => dispatch(deleteFolder(folderId, keep)),
   onTodosGet: () => dispatch(getLists()),
   onTodosClear: () => dispatch({type: actionTypes.CLEAR_LIST}),
   onTodosDelete: (listId, inFolder) => dispatch(deleteList(listId, inFolder)),
   onUserLogout: () => dispatch(logoutUser()),
   onMessageCreate: (type, message) => dispatch(createMessage(type, message))
});

export default connect(mapStateToProps, mapDispatchToProps)(Desktop);