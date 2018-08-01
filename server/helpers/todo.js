const {Todo, TodoList} = require("../models");

//Owner && Admins Only
exports.findAll = (req, res, next) => {
   Todo.find({container: req.params.id})
      .then(todos => {
         console.log(todos);
         if(!todos) throw new Error("Not Found");
         res.status(200).json(todos)
      })
      .catch(error => {
         error.status = 404;
         return next(error);
      });
};

//Owner && Admins Only for non admin creators
exports.create = (req, res, next) => {
   for(field in req.body) req.body[field] = req.sanitize(req.body[field]);
   TodoList.findById(req.params.id)
      .then(list => {
         if(!list) throw new Error("Not Found");
         Todo.create(req.body)
            .then(todo => {
               list.todos.push(todo.id);
               todo.container = list.id;
               return Promise.all([list.save(), todo.save()])
                        .then(resolve => res.status(201).json(todo))
                        .catch(error => error);
            })
            .catch(error => {
               error.status = 500; 
               return next(error);
            });
      })
      .catch(error => {
         error.status = 404;
         next(error);
      });
};

//Owner && Admins Only
exports.findOne = (req, res, next) => {
   Todo.findOne({_id: req.params.todoId})
      .then(todo => {
         if(!todo) throw new Error("Not Found");
         res.status(200).json(todo)
      })
      .catch(error => {
         error.status = 404;
         return next(error);
      });
};

//Owner && Admins Only for non admin creators
exports.update = (req, res, next) => {
   for(field in req.body) req.body[field] = req.sanitize(req.body[field]);
   let{todoId} = req.params;
   if(req.body.container) req.body.container = undefined;
   Todo.findByIdAndUpdate(todoId, req.body, {runValidators: true})
      .then(todo => {
         if(!todo) throw new Error("Not Found");
         res.status(200).json({message: "Todo Updated Successfully"})
      })
      .catch(error => {
         error.status = 404;
         return next(error);
      });
};

//Owner && Admins Only for non admin creators
exports.delete = (req, res, next) => {
   let {todoId} = req.params;

   TodoList.findById(req.params.id)
      .then(list => {
         if(!list) throw new Error("Not Found");
         Todo.findByIdAndRemove(todoId)
            .then(todo => {
               if(!todo) throw new Error("Not Found");
               list.todos.pull(todoId);
               return list.save();
            })
            .then(resolve => res.status(200).json({message: "Todo Deleted Successfully"}))
            .catch(error => {
               error.status = 404;
               return next(error);
            });
      })
      .catch(error => {
         error.status = 404;
         next(error);
      })
};

module.exports = exports;