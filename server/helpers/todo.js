const {Todo, TodoList} = require("../models");

//Owner && Admins Only
exports.find = (req, res, next) => {
   Todo.find({container: req.params.id})
      .then(todos => {
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
   for(field in req.body){ 
      req.body[field] = req.sanitize(req.body[field]);
      if(typeof req.body[field] === "string") req.body[field] = req.body[field].trim();
   };

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
   const {todoId} = req.params,
         options = {
            runValidators: true,
            new: true
         };

   for(field in req.body){ 
      req.body[field] = req.sanitize(req.body[field]);
      if(typeof req.body[field] === "string") req.body[field] = req.body[field].trim();
   };

   if(req.body.container) req.body.container = undefined;//make a validator to make it unchangeable or read only...

   Todo.findByIdAndUpdate(todoId, req.body, options)
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
exports.delete = (req, res, next) => {
   const {todoId} = req.params;

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