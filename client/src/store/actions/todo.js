import qwest from "qwest";
import actionTypes from "./actionTypes";
import {createMessage} from "./message";
qwest.limit(1);

const token = localStorage.getItem("token");

export const createTodo = (listId, newTodo) => {
   return dispatch => {
      qwest.post(`/todos/${listId}/todo?token=${token}`, newTodo)
         .then(data => JSON.parse(data.response))
         .then(response => {
            let {status, message} = response;
            if(status && status !== 201) throw new Error(message);
            return dispatch(addTodo(response));
         })
         .catch(error => dispatch(createMessage("Error", error.message)));
   }
};

const addTodo = newTodo => ({
   type: actionTypes.CREATE_TODO,
   newTodo
});

export const updateTodo = (listId, todoId, prop, newValue) => {
   return dispatch => {
      qwest.map("PATCH", `/todos/${listId}/todo/${todoId}?token=${token}`)
         .then(data => JSON.parse(data.response))
         .then(response => {
            let {status, message} = response;
            if(status && status !== 200) throw new Error(message);
            return dispatch(editTodo(todoId, prop, newValue));
         })
         .catch(error => dispatch(createMessage("Error", error.message)));
   }
};

const editTodo = (todoId, prop, newValue) => ({
   type: actionTypes.EDIT_TODO,
   todoId,
   prop,
   newValue
});

export const removeTodo = (listId, todoId) => {
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