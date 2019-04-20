import React, {Component} from "react";
import {connect} from "react-redux";
import {createTodo} from "../../../store/actions/todo";
import Button from "../../UI/Button/Button";
import "./TodoForm.css";

class TodoForm extends Component {
   state = {
      description: "",
      isLoading: false
   };

   componentDidUpdate(prevProps){
      const {currentList, message, isLoading, updateLoader} = this.props;
      if(prevProps.isLoading && prevProps.currentList !== currentList) this.setState({description: ""}, () => updateLoader(false));
      else if(isLoading && prevProps.message && !message) updateLoader(false);
   }

   onInputUpdate = e => {
      const {name, value} = e.target,
            {isLoading} = this.props;

      if(isLoading) return;
      this.setState({[name]: value});
   };

   onSubmit = e => {
      e.preventDefault();

      const {description} = this.state,
            {currentList, updateLoader, onCreateTodo} = this.props;

      if(description.trim()){
         updateLoader(true);
         onCreateTodo(currentList._id, description);
      }
   }

   render(){
      const {description} = this.state,
            {isLoading} = this.props;

      return (
         <form onSubmit={this.onSubmit} className="TodoForm">
            <input type="text" name="description" value={description} autoComplete="off" onChange={this.onInputUpdate} />
            <Button type="submit" disabled={isLoading || !description.trim()}> Add </Button>
         </form>
      )
   }
}

const mapStateToProps = state => ({
   currentList: state.todoList.current,
   message: state.message.label
})

const mapDispatchToProps = dispatch => ({
   onCreateTodo: (listId, description) => dispatch(createTodo(listId, {description}))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);