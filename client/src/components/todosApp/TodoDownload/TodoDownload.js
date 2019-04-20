import React, {Component, createRef} from "react";
import qwest from "qwest";
import {connect} from "react-redux";
import {createMessage} from "../../../store/actions/message";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faDownload} from '@fortawesome/free-solid-svg-icons'
import "./TodoDownload.css";

class TodoDownload extends Component {
   constructor(props){
      super(props);
      this.downloadLinkRef = createRef();
      this.state = {
         fileUrl: null
      }
   }

   requestDownload = () => {
      this.props.updateLoader(true);
      this.getFile();
   };

   getFile = () => {
      const {todoId, updateLoader, onMessageCreate} = this.props,
            headers  = {Authorization: localStorage.getItem("token")};
            
      qwest.get(`/api/todos/${todoId}/download`, null, {headers})
         .then(data => data.response)
         .then(fileBlob => {
            const fileUrl = window.URL.createObjectURL(new Blob([fileBlob]));
            this.setState({fileUrl}, () => updateLoader(false));
         })
         .catch(error => {
            updateLoader(false);
            onMessageCreate(error.message);
         })
   }

   componentDidUpdate(prepProps, prevState){
      const {fileUrl} = this.state;
      if(prevState.fileUrl !== fileUrl) this.downloadLinkRef.current.click();
   }

   render(){
      const {fileUrl} = this.state,
            {isLoading} = this.props,
            {availWidth} = window.screen;

      return(
         <span className="TodoDownload">
            <a href={fileUrl} download ref={this.downloadLinkRef} style={{display: "none"}}>.</a>
            <FontAwesomeIcon size={availWidth < 600 ? "2x" : "1x"} icon={faDownload} color={isLoading ? "darkgray" : "rgb(59, 167, 122)"} 
                             onClick={this.requestDownload} className={`DownloadIcon ${isLoading ? "DisabledIcon" : "EnabledIcon"}`} />
         </span>
      )
   }
}

const mapDispatchToProps = dispatch => ({
   onMessageCreate: message => dispatch(createMessage("Error", message))
});

export default connect(null, mapDispatchToProps)(TodoDownload);