import React, {Component} from "react";
import {connect} from "react-redux";
import Loader from "../../components/UI/Loader/Loader";
import ReportBugForm from "../../components/ReportBug/ReportBugForm/ReportBugForm";
import {createMessage} from "../../store/actions/message";
import qwest from "qwest";
import "./ReportBug.css";

class ReportBug extends Component {
   state = {
      reportMessage: "",
      isLoading: false,
      messageSent: false
   }

   onInputUpdate = event => this.setState({reportMessage: event.target.value});

   onSubmitForm = event => {
      event.preventDefault();
      this.setState({isLoading: true}, () => {
         const {onMessageCreate} = this.props,
               token = localStorage.getItem("token");

         qwest.post(`/api/services/sendMail?token=${token}`, {message: this.state.reportMessage})
            .then(response => {
               if(response.status && response.status !== 200) throw new Error(response.message);
               this.setState({isLoading: false, messageSent: true, reportMessage: ""}, () => {
                  onMessageCreate("Notification", response.message)
               });
            })
            .catch(error => {
               this.setState({isLoading: false}, () => {
                  onMessageCreate("Error", error.message)
               });
            })
      });
   }
   
   render(){
      const {onInputUpdate, onSubmitForm} = this,
            {reportMessage, isLoading} = this.state,
            content = isLoading ? <Loader />
                                : <ReportBugForm reportMessage={reportMessage} updateInput={onInputUpdate} submitForm={onSubmitForm} />;
      
      return (
         <div className="ReportBug">
            <h3>
               Report a bug:
            </h3>
            {content}
         </div>
      )
   }
}

const mapDispatchToProps = dispatch => ({
   onMessageCreate: (label, content) => dispatch(createMessage(label, content))
});

export default connect(null, mapDispatchToProps)(ReportBug);