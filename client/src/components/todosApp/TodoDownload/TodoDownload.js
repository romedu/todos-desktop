import React, {Component, createRef} from "react";
import qwest from "qwest";
import {connect} from "react-redux";
import {createMessage} from "../../../store/actions/message";
import Loader from "../../UI/Loader/Loader";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faDownload} from '@fortawesome/free-solid-svg-icons'
import "./TodoDownload.css";

class TodoDownload extends Component {
   constructor(props){
      super(props);
      this.downloadLinkRef = createRef();
      this.state = {
         fileUrl: null,
         isLoading: false
      }
   }

   requestDownload = () => this.setState({isLoading: true}, this.getFile);

   getFile = () => {
      const {todoId} = this.props,
            headers  = {Authorization: localStorage.getItem("token")};
            
      qwest.get(`/api/todos/${todoId}/download`, null, {headers})
         .then(data => data.response)
         .then(fileBlob => {
            const fileUrl = window.URL.createObjectURL(new Blob([fileBlob]));
            this.setState({
               fileUrl,
               isLoading: false
            })
         })
         .catch(error => {
            this.setState({isLoading: false}, () => {
               this.props.onMessageCreate(error.message);
            });
         })
   }

   componentDidUpdate(prepProps, prevState){
      const {fileUrl} = this.state;
      if(prevState.fileUrl !== fileUrl) this.downloadLinkRef.current.click();
   }

   render(){
      const {fileUrl, isLoading} = this.state;
      return(
         <span className="TodoDownload">
            <a href={fileUrl} download ref={this.downloadLinkRef} style={{display: "none"}}>.</a>
            <FontAwesomeIcon size="1x" icon={faDownload} color={isLoading ? "darkgray" : "rgb(59, 167, 122)"} onClick={this.requestDownload} 
                             className={`DownloadIcon ${isLoading ? "DisabledIcon" : "EnabledIcon"}`} />
            {isLoading && <Loader mini={true} />}
         </span>
      )
   }
}

const mapDispatchToProps = dispatch => ({
   onMessageCreate: message => dispatch(createMessage("Error", message))
});

export default connect(null, mapDispatchToProps)(TodoDownload);