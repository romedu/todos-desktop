import React, {Component} from "react";
import {connect} from "react-redux";
import NewItemForm from "../NewItemForm/NewItemForm";
import ItemEditForm from "../ItemEditForm/ItemEditForm";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Loader from "../../UI/Loader/Loader";
import {createList, updateList} from "../../../store/actions/todoList";
import {createFolder, updateFolder} from "../../../store/actions/folder";
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
      const {selectedItem, itemType, folderHandler, currentFolder} = this.props;
      if(!selectedItem) folderHandler(null);
      else {
         let {name, image, description} = selectedItem;
         this.setState(prevState => ({
            ...prevState,
            [itemType]: {
               name,
               image,
               description,
               folderName: currentFolder ? currentFolder.name : undefined
            }
         }));
      }
   }

   componentDidUpdate(prevProps){
      const {currentFolder, closeHandler, folders, todoLists} = this.props;
      if((prevProps.currentFolder && currentFolder && (prevProps.currentFolder.files !== currentFolder.files))
         || (prevProps.folders && (prevProps.folders !== folders)) 
         || (prevProps.todoLists && (prevProps.todoLists !== todoLists))) closeHandler();
   }

   componentWillUnmount(){
      const {currentFolder, folderHandler} = this.props;
      if(currentFolder){
         folderHandler(currentFolder._id);
      }
   }

   updateInput = (property, newValue) => {
      const {currentFolder, itemType} = this.props,
            typeToUpdate = currentFolder ? "todo" : itemType;

      return (
         this.setState((prevState) => ({
            ...prevState,
            [typeToUpdate]: {
               ...prevState[typeToUpdate],
               [property]: newValue
            }
         }))
      )
   };

   submitHandler = e => {
      e.preventDefault();
      const {itemType, currentFolder, onFolderCreate, onListCreate} = this.props,
            {folder, todo} = this.state;
      let createAction = onFolderCreate.bind(null, folder);
      if(itemType === "todo" || currentFolder){
         const newTodo = (currentFolder && !todo.folderName) ? {...todo, folderName: currentFolder.name} : {...todo};
         createAction = onListCreate.bind(null, newTodo);
      }
      this.setState(prevState => ({...prevState, isLoading: true}), createAction);
   };

   editItemHandler = e => {
      e.preventDefault();
      const {selectedItem, onFolderUpdate, onListUpdate} = this.props,
            {type} = selectedItem;
      let action;
      if(type === "folder") action = () => (onFolderUpdate(selectedItem.id, this.state[type]));
      else if(type === "todo") action = () => (onListUpdate(selectedItem.id, selectedItem.folderName, this.state[type]));

      return this.setState(prevState => ({...prevState, isLoading: true}), action());
   }

   render(){
      const {itemType, currentFolder, closeHandler, selectedItem, folderNames} = this.props,
            typeToUpdate = currentFolder ? "todo" : itemType;
      //PASS THE ITEM DATA AS A WHOLE OBJECT INSTEAD OF ALL SPREAD OUT
      const formToDisplay = selectedItem ? (<ItemEditForm updateInput={this.updateInput} submitHandler={this.editItemHandler} folders={folderNames}
                                           itemType={typeToUpdate} currentFolder={currentFolder && currentFolder.name} name={this.state[typeToUpdate].name}
                                           image={this.state[typeToUpdate].image} folderDesc={itemType === "folder" ? this.state.folder.description : null} todoFolder={this.state.todo.folderName} />) 
                                         : (<NewItemForm updateInput={this.updateInput} submitHandler={this.submitHandler} 
                                           itemType={typeToUpdate} folders={folderNames} todoFolder={this.state.todo.folderName}
                                           name={this.state[typeToUpdate].name} image={this.state[typeToUpdate].image} folderDesc={this.state.folder.description} />);
                                         
      const content = this.state.isLoading ? <Loader /> : formToDisplay;

      return (
         <div>
            <Backdrop action={closeHandler} coverNav backDropped={!!currentFolder} />
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
   onListCreate: list => dispatch(createList(list)),
   onListUpdate: (id, listFolder, list) => dispatch(updateList(id, listFolder, list))
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);