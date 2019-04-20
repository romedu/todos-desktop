import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {updateTodo, removeTodo} from "../../../store/actions/todo";
import Todo from "../Todo/Todo";
import TodoForm from "../TodoForm/TodoForm";
import TodoDownload from "../TodoDownload/TodoDownload";
import Options from "../../UI/Options/Options";
import {findByProp} from "../../../helpers";
import "./TodoList.css";

class TodoList extends Component {

   changeListHandler = e => {
      const {history, currentFolder} = this.props,
            {value} = e.target;

      history.push(`/todos/${findByProp("name", value, currentFolder.files)._id}`);
   };

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
            todoList = todos.map(todo => <Todo key={todo._id} {...todo} updateHandler={this.todoUpdateHandler} deleteHandler={e => this.deleteTodoHandler(e, todo._id)} />),
            fileNames = currentFolder && currentFolder.files.map(file => file.name),
            changeTodo = currentFolder && fileNames.length > 1 && <Options label="Change List: " optionList={fileNames} selected={name} pickOption={this.changeListHandler} />;

      return (
         <div className="TodoList">
            <h2>
               {name}
            </h2>
            {currentFolder && <h3> {currentFolder.name} </h3>}
            {changeTodo}
            <TodoForm />
            <TodoDownload todoId={todoId} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoList));