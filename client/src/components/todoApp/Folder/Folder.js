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
      const {folderId, onFolderOpen} = this.props;
      onFolderOpen(folderId);
   }

   componentDidUpdate(prevProps){
      if(prevProps.folder !== this.props.folder) this.setState(prevState => ({...prevState, isLoading: false}));
   }

   clearFolderHandler = () => {
      const {closeHandler, onFolderClose} = this.props;
      onFolderClose();
      closeHandler();
   }

   render(){
      const {isLoading} = this.state;
      const {folder, newFormToggle, settingsHandler, deleteHandler} = this.props;
      return (
         <Fragment>
            <Backdrop action={this.clearFolderHandler} coverNav />
            <div className="Folder FolderBorder"></div>
            <div className="Folder FolderInside">
               {isLoading ? <Loader /> : <FolderContent files={folder.files} newFormToggle={newFormToggle} settingsHandler={settingsHandler} deleteHandler={deleteHandler}> {folder.name} </FolderContent>}
            </div>
         </Fragment>
      )
   }
};

const mapStateToProps = state => ({
   folder: state.folder.current
});

const mapDispatchToProps = dispatch => ({
   onFolderOpen: folderId => dispatch(openFolder(folderId)),
   onFolderClose: () => dispatch(closeFolder())
});

export default connect(mapStateToProps, mapDispatchToProps)(Folder);