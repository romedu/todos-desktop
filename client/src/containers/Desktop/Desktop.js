import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getFolders, clearFolders, clearFoldersList, deleteFolder} from "../../store/actions/folder";
import {getLists, deleteList} from "../../store/actions/todoList";
import {logoutUser} from "../../store/actions/auth";
import {createMessage} from "../../store/actions/message";
import ButtonGroup from "../../components/UI/ButtonGroup/ButtonGroup";
import IconList from "../../components/todoDesktop/IconList/IconList";
import Folder from "../../components/todoDesktop/Folder/Folder";
import ItemForm from "../ItemForm/ItemForm";
import Loader from "../../components/UI/Loader/Loader";
import Confirmation from "../../components/UI/Confirmation/Confirmation";
import Options from "../../components/UI/Options/Options";
import actionTypes from "../../store/actions/actionTypes";
import {findByProp, getQueries, toKebabCase} from "../../helpers";

class Desktop extends Component{
   state = {
      openFolderId: null,
      isLoading: false,
      itemToEdit: null,
      showItemForm: false,
      sorting: {
         property: null,
         order: null,
         label: null
      },
      confirmation: {
         deleteConfirm: false,
         keepItemsConfirm: false,
         isLoading: false
      }
   };

   componentDidMount(){
      this.checkToken();
      this.sortParamsHandler();
   }

   componentDidUpdate(prevProps, prevState){
      const {itemsType, folders, todos, message, location} = this.props,
            {openFolderId, showItemForm, isLoading, confirmation, sorting} = this.state;
            
      this.checkToken();
      if((prevProps.itemsType !== itemsType) || (prevState.sorting.label !== sorting.label)) return this.getItems();
      else if(prevProps.location !== location) return this.sortParamsHandler();

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

   componentWillUnmount(){
      const {itemsType, onFolderListClear, onTodosClear} = this.props;

      if(itemsType === "folder") return onFolderListClear(); 
      return onTodosClear(); 
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
      const {sorting} = this.state,
            {folders, todos, itemsType, onFoldersGet, onFoldersClear, onTodosGet, onTodosClear} = this.props,
            action = (itemsType === "folder") 
                   ? () => {
                      if(todos) onTodosClear();
                      onFoldersGet(sorting.property, sorting.order);} 
                   : () => {
                      if(folders) onFoldersClear();
                      onTodosGet(sorting.property, sorting.order);};

      this.setState({isLoading: true}, action);
   };

   openFolderHandler = folderId => this.setState({openFolderId: folderId || null});

   sortingHandler = e => {
      const {value} = e.target,
            {history, location} = this.props;
      history.push(`${location.pathname}?sort=${toKebabCase(value)}`);
   };

   sortParamsHandler = () => {
      const {location} = this.props,
            {sort: sortParam} = getQueries(location.search);

      switch(sortParam){
         case "unpopularity": return this.setState({
            sorting: {
               property: "__v",
               order: "ascending",
               label: "Unpopularity"
            }
         });
         case "newest-to-oldest": return this.setState({
            sorting: {
               property: "createdAt",
               order: "descending",
               label: "Newest to Oldest"
            }
         });
         case "oldest-to-newest": return this.setState({
            sorting: {
               property: "createdAt",
               order: "ascending",
               label: "Oldest to Newest"
            }
         });
         case "from-a-z": return this.setState({
            sorting: {
               property: "name",
               order: "ascending",
               label: "From A-Z"
            }
         });
         case "from-z-a": return this.setState({
            sorting: {
               property: "name",
               order: "descending",
               label: "From Z-A"
            }
         });
         default: return this.setState({
            sorting: {
               property: "__v",
               order: "descending",
               label: "Popularity"
            }
         });
      }
   }; 

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
      const {isLoading, openFolderId, showItemForm, itemToEdit, confirmation, sorting} = this.state,
            {itemsType, folders, todos, currentFolder, message} = this.props,
            buttons = [
               {
                  description: "Create Item",
                  action: this.itemFormHandler
               },
               {
                  description: "Folders",
                  url: `/folders?sort=${sorting.label ? toKebabCase(sorting.label) : "popularity"}`
               },
               {
                  description: "TodoLists",
                  url: `/todos?sort=${sorting.label ? toKebabCase(sorting.label) : "popularity"}`
               }
            ];
      const itemList = ((folders && folders.length) || (todos && todos.length))
                     ? <IconList folders={folders} todos={todos} openHandler={this.openFolderHandler} settingsHandler={this.settingsHandler} deleteHandler={this.deleteConfHandler} />
                     : <h4> Your desktop is empty, *** SAD FACE *** </h4>;
      const sortingLabels = ["Popularity", "Unpopularity", "Newest to Oldest", "Oldest to Newest", "From A-Z", "From Z-A"];

      //REMOVE INLINE STYLES
      return (
         <div>
            <h1 style={{fontSize: "3em", fontFamily: 'Alegreya'}}>
               Todos Desktop
            </h1>
            {!isLoading && <ButtonGroup buttons={buttons} />}
            {!isLoading && <Options label="Sort By: " optionList={sortingLabels} selected={sorting.label} pickOption={this.sortingHandler} />}
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
   onFoldersGet: (sortProp, sortOrder) => dispatch(getFolders(sortProp, sortOrder)),
   onFoldersClear: () => dispatch(clearFolders()),
   onFolderListClear: () => dispatch(clearFoldersList()),
   onFolderDelete: (folderId, keep) => dispatch(deleteFolder(folderId, keep)),
   onTodosGet: (sortProp, sortOrder) => dispatch(getLists(sortProp, sortOrder)),
   onTodosClear: () => dispatch({type: actionTypes.CLEAR_LIST}),
   onTodosDelete: (listId, inFolder) => dispatch(deleteList(listId, inFolder)),
   onUserLogout: () => dispatch(logoutUser()),
   onMessageCreate: (type, message) => dispatch(createMessage(type, message))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Desktop));