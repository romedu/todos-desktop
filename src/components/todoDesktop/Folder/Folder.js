import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {openFolder, closeFolder} from "../../../store/actions/folder";
import FolderContent from "../FolderContent/FolderContent";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Loader from "../../UI/Loader/Loader";
import "./Folder.css";

class Folder extends Component {
   state = {
      isLoading: true
   }

   componentDidMount(){
      const {folder, folderId, onFolderOpen} = this.props;
      
      // Check if the folder were already fetched
      if(folder) this.setState({isLoading: false});
      else onFolderOpen(folderId);
   }

   componentDidUpdate(prevProps){
      const {folder} = this.props;
      if(!prevProps.folder && folder) this.setState({isLoading: false});
   }

   clearFolderHandler = () => {
      const {closeHandler, onFolderClose} = this.props;
      onFolderClose();
      closeHandler();
   }

   render(){
      const {isLoading} = this.state,
            {folder, newFormToggle, settingsHandler, deleteHandler} = this.props,
            content = isLoading ? <Loader /> 
                                : <FolderContent files={folder.files} folderName={folder.name} newFormToggle={newFormToggle} settingsHandler={settingsHandler} deleteHandler={deleteHandler} />

      return (
         <Fragment>
            <Backdrop closeHandler={this.clearFolderHandler} zIndex="3" coverNav />
            <div className="Folder FolderBorder"></div>
            <div className="Folder FolderInside">
               {content}
            </div>
         </Fragment>
      )
   }
};

const mapStateToProps = state => ({
   folder: state.folder.current,
   message: state.message.content
});

const mapDispatchToProps = dispatch => ({
   onFolderOpen: folderId => dispatch(openFolder(folderId)),
   onFolderClose: () => dispatch(closeFolder())
});

export default connect(mapStateToProps, mapDispatchToProps)(Folder);