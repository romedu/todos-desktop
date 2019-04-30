import React, {Component, Fragment} from "react";
import Folder from "../Folder/Folder";
import IconList from "../IconList/IconList";

class FolderDisplay extends Component {
   state = {
      folderInDisplay: null
   }

   componentDidUpdate(prevProps){
      const {folderInDisplay} = this.state,
            {message, folders} = this.props;

      // Close a folder if an error where to occur while opening it
      // Instead of folders, the folder's files are the one that really needs to be checked 
      if(prevProps.message && !message && folderInDisplay && !folders) return this.displayFolderHandler();
   }

   // Updates the displaying folder state
   displayFolderHandler = folderId => this.setState({folderInDisplay: folderId || null});

   render(){
      const {folderInDisplay} = this.state,
            {folders, itemFormHandler, settingsHandler, deleteHandler} = this.props;

      return (
         <Fragment>
            {folderInDisplay && <Folder folderId={folderInDisplay} 
                                        closeHandler={this.displayFolderHandler} 
                                        newFormToggle={itemFormHandler} 
                                        settingsHandler={settingsHandler} 
                                        deleteHandler={deleteHandler} />}
                                        
            {folders && folders.length && <IconList folders={folders} 
                                                    openHandler={this.displayFolderHandler} 
                                                    settingsHandler={settingsHandler} 
                                                    deleteHandler={deleteHandler} />}
         </Fragment>
      )
   }
}

export default FolderDisplay;