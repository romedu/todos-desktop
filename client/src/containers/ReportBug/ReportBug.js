import React, {Component} from "react";
import Loader from "../../components/UI/Loader/Loader";
import ReportBugForm from "../../components/ReportBug/RepurtBugForm/ReportBugForm";
import "./ReportBug.css";

class ReportBug extends Component {
   state = {
      reportMessage: "",
      isLoading: false,
      messageSent: false
   }
   
   onInputUpdate = event => this.setState({reportMessage: event.target.value});
   onSubmitForm = event => {
      //HANDLE FORM SUBMISSION
      console.log("form submitted");
      this.setState({isLoading: true});
   }
   
   render(){
      const {onInputUpdate, onSubmitForm} = this,
            {reportMessage, isLoading, messageSent} = this.state,
            content = messageSent ? <h5> Bug reported successfully </h5>
                                  : <ReportBugForm reportMessage={reportMessage} updateInput={onInputUpdate} submitForm={onSubmitForm} />;
      
      return (
         <div className="ReportBug">
            <h3>
               Report a bug:
            </h3>
            {isLoading ? <Loader /> : content}
         </div>
      )
   }
}

export default ReportBug;