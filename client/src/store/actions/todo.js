import qwest from "qwest";
import actionTypes from "./actionTypes";
import {createMessage} from "./message";
qwest.limit(1);

export const createTodo = (listId, newTodoData) => {
   const token = localStorage.getItem("token");
   return dispatch => {
      qwest.post(`/todos/${listId}/todo?token=${token}`, newTodoData)
         .then(data => JSON.parse(data.response))
         .then(response => {
            let {status, message, ...newTodo} = response;
            if(status && status !== 201) throw new Error(message);
            return dispatch(addTodo(newTodo));
         })
         .catch(error => dispatch(createMessage("Error", error.message)));
   }
};

const addTodo = newTodo => ({
   type: actionTypes.CREATE_TODO,
   newTodo
});

export const updateTodo = (listId, todoId, prop, newValue) => {
   const token = localStorage.getItem("token");
   return dispatch => {
      qwest.map("PATCH", `/todos/${listId}/todo/${todoId}?token=${token}`, {[prop]: newValue})
         .then(data => JSON.parse(data.response))
         .then(editedTodo => {
            let {status, message, ...editedTodo} = response;
            if(status && status !== 200) throw new Error(message);
            return dispatch(editTodo(editedTodo));
         })
         .catch(error => dispatch(createMessage("Error", error.message)));
   }
};

const editTodo = editedTodo => ({
   type: actionTypes.EDIT_TODO,
   editedTodo
});

export const removeTodo = (listId, todoId) => {
   const token = localStorage.getItem("token");
   return dispatch => {
      qwest["delete"](`/todos/${listId}/todo/${todoId}?token=${token}`)
         .then(data => JSON.parse(data.response))
         .then(response => {
            let {status, message} = response;
            if(status && status !== 200) throw new Error(message);
            return dispatch(deleteTodo(todoId));
         })
         .catch(error => dispatch(createMessage("Error", error.message)));
   }
}

const deleteTodo = todoId => ({
   type: actionTypes.DELETE_TODO,
   todoId
});