import React, {Component, createRef} from "react";
import {connect} from "react-redux";
import {updateTodo} from "../../../store/actions/todo";
import Button from "../../UI/Button/Button";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPencilAlt} from '@fortawesome/free-solid-svg-icons'
import "./Todo.css";

class Todo extends Component {
   constructor(props){
      super(props);
      this.inputElementRef = createRef();
      this.state = {
         description: this.props.description,
         isUpdating: false
      }
   }

   enableUpdating = e => {
      e.stopPropagation();
      this.setState({isUpdating: true}, () => {
         this.inputElementRef.current.focus();
      });
   }

   updateInputHandler = ({target}) => this.setState({description: target.value});

   updateDescHandler = () => {
      const {description} = this.state;

      // Since this field is required, if it is left empty it gets deleted
      if(!description.trim()) return this.props.deleteHandler();

      this.setState({isUpdating: false}, () => {
         const {_id, updateHandler} = this.props;
         updateHandler(_id, {description});
      });
   }

   checkHandler = () => {
      const {_id, checked, updateHandler} = this.props;
      updateHandler(_id, {checked: !checked});
   }

   render(){
      const {description, isUpdating} = this.state,
            {checked, deleteHandler} = this.props,
            content = isUpdating ? <input type="text" value={description} onChange={this.updateInputHandler} onBlur={this.updateDescHandler} 
                                          onClick={e => e.stopPropagation()} ref={this.inputElementRef} />
                                 : <span className="TodoDescription">
                                       {description}
                                   </span>;

      return (
         <li className={`Todo ${checked ? "checkedTodo" : ""}`} onClick={this.checkHandler}>
            <div>
               {content}
               <span className="TodoButtons">
                  <FontAwesomeIcon size="1x" icon={faPencilAlt} color="rgb(59, 167, 122)" onClick={this.enableUpdating} />
                  <Button action={deleteHandler} design="delete">
                     X
                  </Button>
               </span>
            </div>
         </li>
      );
   }
};

const mapDispatchToProps = dispatch => ({
   updateTodo: (listId, todoId, updatedData) => dispatch(updateTodo(listId, todoId, updatedData))
});

export default connect(null, mapDispatchToProps)(Todo);