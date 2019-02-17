const {Folder} = require("../models"),
      {errorHandler} = require("../helpers/error");

exports.checkPermission = (req, res, next) => {
   const {isAdmin, id: userId} = req.user;
   Folder.findOne({_id: req.params.id}).populate("creator").exec()
      .then(folder => {
         if(!folder) throw errorHandler(404, "Not Found");
         
         const {creator} = folder;
         if(!isAdmin && creator.id !== userId) throw errorHandler(401, "You are not authorized");
         req.creator = creator;
         return next();
      })
      .catch(error => {
         if(!error.status) error = errorHandler(404, "Not Found");
         return next(error);
      });
};

exports.ownerPrivileges = (req, res, next) => {
   const {user, creator} = req;

   //If the user isn't an admin then it means he's the owner
   if(!user.isAdmin || !creator.isAdmin || creator.id === user.id) return next();
   return next(errorHandler(401, "You are not authorized to proceed"));
};