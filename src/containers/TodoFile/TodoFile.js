import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {openList} from "../../store/actions/todoList";
import {closeFolder} from "../../store/actions/folder";
import TodoList from "../../components/todosApp/TodoList/TodoList";
import Loader from "../../components/UI/Loader/Loader";

class TodoFile extends Component {
   state = {
      isLoading: true
   };

   componentDidMount(){
      const {onListOpen, match} = this.props;
      onListOpen(match.params.id);
   }

   componentDidUpdate(prevProps){
      const {currentList, match, onListOpen} = this.props;

      if(currentList && (currentList !== prevProps.currentList)) return this.setState({isLoading: false});
      if(match.params.id !== prevProps.match.params.id) this.setState({isLoading: true}, () => onListOpen(match.params.id));
   }

   componentWillUnmount(){
      const {currentFolder, onFolderClose} = this.props;
      // If the file belongs to a folder, it gets closed
      if(currentFolder) onFolderClose();
   }

   render(){
      const {message, currentList} = this.props,
            {isLoading} = this.state,
            content = isLoading ? <Loader /> : <TodoList {...currentList} />; 

      return (
         <div>
            {isLoading && message && <Redirect to="/not-found" /> }
            {content}
         </div>
      );
   }
}

const mapStateToProps = state => ({
   message: state.message.content,
   currentList: state.todoList.current,
   currentFolder: state.folder.current
});

const mapDispatchToProps = dispatch => ({
   onListOpen: listId => dispatch(openList(listId)),
   onFolderClose: () => dispatch(closeFolder())
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoFile);