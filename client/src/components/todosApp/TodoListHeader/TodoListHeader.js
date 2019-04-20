import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import TodoForm from "../TodoForm/TodoForm";
import TodoDownload from "../TodoDownload/TodoDownload";
import Options from "../../UI/Options/Options";
import Loader from "../../UI/Loader/Loader";
import {findByProp} from "../../../helpers";

class TodoListHeader extends Component {
   state = {
      isLoading: false
   }

   updateLoader = isLoading => this.setState({isLoading});

   changeListHandler = e => {
      const {history, currentFolder} = this.props,
            {value} = e.target;

      history.push(`/todos/${findByProp("name", value, currentFolder.files)._id}`);
   };

   render(){
      const {isLoading} = this.state,
            {name, todoId, currentFolder} = this.props,
            fileNames = currentFolder && currentFolder.files.map(file => file.name),
            changeTodo = currentFolder && fileNames.length > 1 && <Options label="Change List: " optionList={fileNames} 
                                                                           selected={name} pickOption={this.changeListHandler} />;

      return (
         <div>
            <h2>
               {name}
            </h2>
            {currentFolder && <h3> {currentFolder.name} </h3>}
            {changeTodo}
            <div>
               <TodoForm isLoading={isLoading} updateLoader={this.updateLoader} /> 
               <TodoDownload todoId={todoId} isLoading={isLoading} updateLoader={this.updateLoader} />
               {isLoading && <Loader mini={true} />}
            </div>
         </div>
      )
   }
}

export default withRouter(TodoListHeader);