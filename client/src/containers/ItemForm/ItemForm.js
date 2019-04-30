import React, {Component} from "react";
import {connect} from "react-redux";
import NewItemForm from "../../components/todoDesktop/NewItemForm/NewItemForm";
import ItemEditForm from "../../components/todoDesktop/ItemEditForm/ItemEditForm";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Loader from "../../components/UI/Loader/Loader";
import {createList, updateList} from "../../store/actions/todoList";
import {createFolder, updateFolder} from "../../store/actions/folder";
import "./ItemForm.css";

class ItemForm extends Component {
   state = {
      folder: {
         name: "",
         image: "",
         description: ""
      },
      todo: {
         name: "",
         image: "",
         folderName: undefined
      },
      isLoading: false
   }

   componentDidMount(){
      const {itemType, itemToEdit, currentFolder} = this.props;

      if(itemToEdit){
         const {name, image, description} = itemToEdit;
         this.setState({
            [itemType]: {
               name,
               image: image || "",
               description: description || "",
               folderName: currentFolder ? currentFolder.name : undefined
            }
         });
      }
   }

   componentDidUpdate(prevProps){
      const {folders, todoLists, currentFolder} = this.props;
      if((prevProps.folders !== folders) || (prevProps.todoLists !== todoLists) || (prevProps.currentFolder !== currentFolder)) this.props.closeHandler();
   }

   updateInput = e => {
      const {name: propertyName, value: newValue} = e.target,
            {currentFolder, itemType} = this.props,
            typeToUpdate = currentFolder ? "todo" : itemType;

      this.setState(prevState => ({
         [typeToUpdate]: {
            ...prevState[typeToUpdate],
            [propertyName]: newValue
         }
      }));
   };

   createItemHandler = e => {
      e.preventDefault();
      const {itemType, currentFolder, onFolderCreate, onListCreate} = this.props,
            {folder, todo} = this.state;
      let createAction;

      if(itemType === "todo" || currentFolder){
         const newTodo = currentFolder ? {...todo, folderName: currentFolder.name} : {...todo};
         createAction = (() => onListCreate(newTodo, !!currentFolder));
      }
      else createAction = (() => onFolderCreate(folder));
      this.setState({isLoading: true}, createAction);
   };

   editItemHandler = e => {
      e.preventDefault();
      const {itemToEdit, onFolderUpdate, onListUpdate} = this.props,
            {folder, todo} = this.state,
            {type: itemType, _id: itemId, folderName: itemFolderName} = itemToEdit;
      let action;

      if(itemType === "folder") action = (() => (onFolderUpdate(itemId, folder)));
      else if(itemType === "todo") action = (() => (onListUpdate(itemId, itemFolderName, todo)));

      return this.setState({isLoading: true}, action());
   }

   render(){
      const {isLoading} = this.state,
            {itemType, currentFolder, closeHandler, itemToEdit, folderNames} = this.props,
            typeToUpdate = currentFolder ? "todo" : itemType,
            formToDisplay = itemToEdit ? (<ItemEditForm updateInput={this.updateInput} submitHandler={this.editItemHandler} folderNames={folderNames}
                                           itemType={typeToUpdate} {...this.state[typeToUpdate]} />) 
                                       : (<NewItemForm updateInput={this.updateInput} submitHandler={this.createItemHandler} folderNames={folderNames} 
                                          itemType={typeToUpdate} openFolderName={currentFolder && currentFolder.name} {...this.state[typeToUpdate]} />);
                                         
      const content = isLoading ? <Loader /> : formToDisplay;

      return (
         <div>
            <Backdrop closeHandler={!isLoading ? closeHandler : null} slightDrop={!!currentFolder} zIndex="5" coverNav />
            <div className="itemForm">
               {content}
            </div>
         </div>
      );
   }
};

const mapStateToProps = state => ({
   currentFolder: state.folder.current,
   folders: state.folder.list,
   folderNames: state.folder.namesList,
   todoLists: state.todoList.lists
});

const mapDispatchToProps = dispatch => ({
   onFolderCreate: folder => dispatch(createFolder(folder)),
   onFolderUpdate: (id, folder) => dispatch(updateFolder(id, folder)),
   onListCreate: (list, insideFolder) => dispatch(createList(list, insideFolder)),
   onListUpdate: (id, listFolder, list) => dispatch(updateList(id, listFolder, list))
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);