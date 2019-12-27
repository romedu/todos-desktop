import React, {Component} from "react";
import {connect} from "react-redux";
import {updateTodo, removeTodo} from "../../../store/actions/todo";
import Todo from "../Todo/Todo";
import TodoListHeader from "../TodoListHeader/TodoListHeader";
import "./TodoList.css";

class TodoList extends Component {
   todoUpdateHandler = (todoId, updateData) => {
      const {_id: listId, onTodoUpdate} = this.props;
      onTodoUpdate(listId, todoId, updateData);
   };

   deleteTodoHandler = (e, todoId) => {
      // It can also be called from the todo without an event triggering it
      if(e) e.stopPropagation();
      const {_id: listId, onTodoDelete} = this.props;
      onTodoDelete(listId, todoId);
   };

   render(){
      const {name, _id: todoId, todos, currentFolder} = this.props,
            todoList = todos.map(todo => <Todo key={todo._id} {...todo} updateHandler={this.todoUpdateHandler} deleteHandler={e => this.deleteTodoHandler(e, todo._id)} />);

      return (
         <div className="TodoList">
            <TodoListHeader currentFolder={currentFolder} name={name} todoId={todoId} />
            <ul>
               {todoList.length ? todoList : <h4> Your list is empty.... </h4>}
            </ul>
         </div>
      );
   }
};

const mapStateToProps = state => ({
   currentFolder: state.folder.current
});

const mapDispatchToProps = dispatch => ({
   onTodoUpdate: (listId, todoId, todoData) => dispatch(updateTodo(listId, todoId, todoData)),
   onTodoDelete: (listId, todoId) => dispatch(removeTodo(listId, todoId))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);