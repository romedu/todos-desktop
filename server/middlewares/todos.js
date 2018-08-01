const {TodoList} = require("../models");

exports.checkPermission = (req, res, next) => {
   let {isAdmin} = req.user;
   if(isAdmin) return next();
   TodoList.findById(req.params.id).populate("creator").exec()
      .then(list => {
         if(!list) throw new Error("Not Found");
         if(list.creator.id !== req.user.id) throw new Error("You are not authorized");
         return next();
      })
      .catch(error => {
         error.status = 401;
         return next(error);
      });
}

exports.ownerPrivileges = (req, res, next) => {
   let {isAdmin} = req.user;
   let userId = req.user.id;
   if(!isAdmin) return next();
   TodoList.findById(req.params.id).populate("creator").exec()
      .then(list => {
         if(!list.creator.isAdmin || list.creator.id === userId) return next();
         throw new Error("You are not authorized to proceed");
      })
      .catch(error => {
         error.status = 401;
         return next(error);
      });
};

exports.ownerOnly = (req, res, next) => {
   TodoList.findById(req.params.id).populate("creator").exec()
      .then(list => {
         if(!list || (list.creator.id !== req.user.id)) throw new Error("You are not authorized to proceed");
         return next();
      })
      .catch(error => {
         error.status = 401;
         return next(error);
      });
}