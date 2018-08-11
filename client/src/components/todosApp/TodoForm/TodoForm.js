import React, {Component} from "react";
import {connect} from "react-redux";
import {createTodo} from "../../../store/actions/todo";
import Button from "../../UI/Button/Button";

class TodoForm extends Component {
   state = {
      description: ""
   };

   onInputUpdate = e => {
      const {name, value} = e.target;

      this.setState({[name]: value});
   };

   onSubmit = e => {
      e.preventDefault();

      const {description} = this.state,
            {currentList, onCreateTodo} = this.props;

      if(description.trim()) this.setState({description: ""}, onCreateTodo(currentList._id, description));
   }

   render(){
      const {description} = this.state;

      return (
         <form onSubmit={this.onSubmit}>
            <input type="text" name="description" value={description} autoComplete="off" onChange={this.onInputUpdate} />
            <Button type="submit"> Add </Button>
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