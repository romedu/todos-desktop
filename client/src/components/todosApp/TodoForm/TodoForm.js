import React, {Component} from "react";
import {connect} from "react-redux";
import {createTodo} from "../../../store/actions/todo";
import Button from "../../UI/Button/Button";
import Loader from "../../UI/Loader/Loader";
import "./TodoForm.css";

class TodoForm extends Component {
   state = {
      description: "",
      isLoading: false
   };

   componentDidUpdate(prevProps, prevState){
      const {currentList} = this.props;
      if(prevState.isLoading && prevProps.currentList !== currentList) this.setState({isLoading: false, description: ""});
   }

   onInputUpdate = e => {
      const {name, value} = e.target,
            {isLoading} = this.state;

      if(isLoading) return;
      this.setState({[name]: value});
   };

   onSubmit = e => {
      e.preventDefault();

      const {description} = this.state,
            {currentList, onCreateTodo} = this.props;

      if(description.trim()){
         this.setState({
            isLoading: true
         }, onCreateTodo(currentList._id, description));
      }
   }

   render(){
      const {description, isLoading} = this.state;

      return (
         <form onSubmit={this.onSubmit} className="TodoForm">
            <input type="text" name="description" value={description} autoComplete="off" onChange={this.onInputUpdate} />
            <Button type="submit" disabled={isLoading || !description.trim()}> Add </Button>
            {isLoading && <Loader mini={true} />}
         </form>
      )
   }
}

const mapStateToProps = state => ({
   currentList: state.todoList.current
})

const mapDispatchToProps = dispatch => ({
   onCreateTodo: (listId, description) => dispatch(createTodo(listId, {description}))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);