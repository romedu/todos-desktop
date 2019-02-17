const {Folder, TodoList} = require("../models"),
      {errorHandler} = require("./error");

exports.find = (req, res, next) => {
   const {isAdmin} = req.user,
         {getAll, page, limit, sortProp, sortOrder} = req.query,
         searchArg = isAdmin && getAll ? {} : {creator: req.user.id},
         options = {
            sort: {[sortProp]: sortOrder},
            page,
            limit: Number(limit)
         };

   //Temporary fix for retrieving all the docs
   if(limit){
      Folder.paginate(searchArg, options)
      .then(foundFolders => {
         if(!foundFolders) throw new Error("Not Found");
         res.status(200).json(foundFolders)
      })
      .catch(error => {
         error.status = 404;
         return next(error);
      });
   }
   else {
      Folder.find(searchArg)
      .then(foundFolders => {
         if(!foundFolders) throw new Error("Not Found");
         res.status(200).json(foundFolders)
      })
      .catch(error => {
         error.status = 404;
         return next(error);
      });
   }
};

exports.create = (req, res, next) => {
   Folder.create(req.body)
      .then(newFolder => {
         newFolder.creator = req.user.id;
         return newFolder.save()
                  .then(resolve => res.status(201).json(newFolder))
                  .catch(error => error);
      })
      .catch(error => {
         if(!error.message || error.code === 11000) error = errorHandler(409, "That name is not avaibale, please try another one");
         return next(error);
      });
};

//Check if owner or admin
exports.findOne = (req, res, next) => {
   Folder.findOne({_id: req.params.id}).populate("files").exec()
      .then(folder => {
         if(!folder) throw new Error("Not Found");
         res.status(200).json(folder)
      })
      .catch(error => {
         error.status = 404;
         return next(error);
      });
};

//Only the owner or admins for non admin creators
exports.update = (req, res, next) => {
  const options = {
      new: true,
      runValidators: true
   };
   
   Folder.findByIdAndUpdate(req.params.id, req.body, options).populate("files").exec()
      .then(folder => {
         if(!folder) throw new Error("Not Found");
         const {files} = folder,
               {name} = req.body;

         if(name && files.length){
            const addons = [];
            files.forEach(file => {
               file.folderName = name;
               addons.push(file.save());
            });
            return Promise.all(addons)
                     .then(resolve => res.status(200).json(folder))
                     .catch(error => error);
         }
         return res.status(200).json(folder);
      })
      .catch(error => {
         if(!error.message || error.code === 11000) error = errorHandler(409, "That name is not avaibale, please try another one");
         else error.status = 404;
         return next(error);
      });
};

//Only the owner or admins for non admin creators
exports.delete = (req, res, next) => {
   Folder.findByIdAndRemove(req.params.id).populate("files").exec()
      .then(folder => {
         if(!folder) throw new Error("Not Found");
         const {files, name} = folder,
               {keep} = req.query;

         if(files.length){
            if(keep) return TodoList.updateMany({folderName: name}, {folderName: null});
            return TodoList.deleteMany({folderName: name});
         }
         return;
      })
      .then(resolve => res.status(200).json({message: "Folder Removed Successfully"}))
      .catch(error => {
         error.status = 404;
         return next(error);
      });
};

module.exports = exports;