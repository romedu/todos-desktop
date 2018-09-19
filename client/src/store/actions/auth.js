import qwest from "qwest";
import actionTypes from "./actionTypes";
import {createMessage} from "./message";
qwest.limit(1);

export const verifyToken = () => {
   const token = localStorage.getItem("token");
   return dispatch => {
      qwest.get(`/api/auth/verify?token=${token}`)
         .then(data => JSON.parse(data.response))
         .then(response => {
            let {username, isAdmin, id, status, message} = response;
            if(status && status !== 200) throw new Error(message);
            return dispatch(loginUser(username, isAdmin, id));
         })
         .catch(error => {
            localStorage.removeItem("token");
            localStorage.removeItem("tokenExp");
            dispatch(createMessage("Error", error.message));
         });
   }
};

export const authenticateUser = (type, username, password) => {
   return dispatch => {
      qwest.post(`/api/auth/${type}`, {username, password})
         .then(data => JSON.parse(data.response))
         .then(response => {
            let {username, isAdmin, id, token, tokenExp, status, message} = response;
            if(status && status !== 200) throw new Error(message);
            localStorage.setItem("token", token);
            localStorage.setItem("tokenExp", tokenExp);
            return dispatch(loginUser(username, isAdmin, id));
         })
         .catch(error => dispatch(createMessage("Error", error.message)));
   }
};

export const logoutUser = () => {
   return dispatch => {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExp");
      return dispatch({type: actionTypes.LOGOUT});
   }
};

const loginUser = (username, isAdmin, id) => ({
   type: actionTypes.LOGIN,
   username,
   isAdmin, 
   id
});