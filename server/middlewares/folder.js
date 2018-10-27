const {Folder} = require("../models");

exports.checkPermission = (req, res, next) => {
   let {isAdmin} = req.user;
   if(isAdmin) return next();
   Folder.findById(req.params.id).populate("creator").exec()
      .then(folder => {
         if(!folder) throw new Error("Not Found");
         if(folder.creator.id === req.user.id) return next();
         throw new Error("You are not authorized");
      })
      .catch(error => {
         error.status = 401;
         return next(error);
      });
};

exports.ownerPrivileges = (req, res, next) => {
   let {isAdmin} = req.user;
   let userId = req.user.id;
   if(!isAdmin) return next();
   Folder.findById(req.params.id).populate("creator").exec()
      .then(folder => {
         if(!folder) throw new Error("Not Found");
         if(!folder.creator.isAdmin || folder.creator.id === userId) return next();
         throw new Error("You are not authorized to proceed");
      })
      .catch(error => {
         error.status = 401;
         return next(error);
      });
};