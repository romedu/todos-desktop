const {TodoList, Todo, Folder} = require("../models");

exports.findAll = (req, res, next) => {
   let {isAdmin} = req.user;
   let {getAll} = req.query;
   let searchParam = isAdmin && getAll ? {} : {creator: req.user.id};
   TodoList.find(searchParam)
      .then(lists => {
         if(!lists) throw new Error("Not Found");
         res.status(200).json(lists)
      })
      .catch(error => {
         error.status = 404;
         return next(error);
      });
};

exports.create = (req, res, next) => {
   for(field in req.body) req.body[field] = req.sanitize(req.body[field]);
   Folder.findOne({name: req.body.folderName}).populate("creator").exec()
      .then(folder => {
         if(!folder || folder.creator.id !== req.user.id) req.body.folderName = undefined;
         return TodoList.create(req.body)
                  .then(newList => {
                     let addons = [];
                     newList.creator = req.user.id;
                     addons.push(newList.save());
                     if(folder){
                        folder.files.push(newList);
                        addons.push(folder.save());
                     }
                     return Promise.all(addons)
                              .then(resolve => res.status(201).json(newList))
                              .catch(error => error);
                  })
                  .catch(error => next(error))
      })
      .catch(error => {
         return next(error);
      });
};

exports.findOne = (req, res, next) => {
   TodoList.findOne({_id: req.params.id}).populate("todos").exec()
      .then(list => {
         if(!list) throw new Error("Not Found");
         return res.status(200).json(list);
      })
      .catch(error => {
         error.status = 404;
         return next(error);
      });
};

// IT SHOULD BE PROMISES INSTEAD OF CALLBACKS. MAKE SURE BEFORE CALLING NEXT, TO SET THE ERROR'S STATUS TO 404
exports.update = (req, res, next) => {
   for(field in req.body) req.body[field] = req.sanitize(req.body[field]);

   let {folderName, ...updateData} = req.body;
   Folder.findOne({name: folderName}, (error, newFolder) => {
      if(newFolder && error) return next(error);
      const options = {
         new: true, 
         runValidators: true
      };

      return TodoList.findByIdAndUpdate(req.params.id, updateData, options, (error, newList) => {
               if(error || !newList) return next(error);
               //CHECK IF THE USER IS THE OWNER OF THE NEW FOLDER, OR IF "NO FOLDER" WAS REQUESTED
               if(((folderName !== "-- No Folder --") && !newFolder) || (newFolder && (newFolder.creator.id !== req.user.id))) folderName = newList.folderName;
               //CHECK IF THE NEW LIST IS DIFFERENT THAN THE ONE CURRENTLY IN THE FOLDER, CHECK IF THE LIST'S FOLDERNAME IS NOT UNDEFINED WHILE REQUESTING "NO FOLDER"
               if(((folderName && (folderName !== "-- No Folder --")) && (newList.folderName !== folderName)) || (!newList.folderName && (folderName !== "-- No Folder --") || (newList.folderName && (folderName === "-- No Folder --")))){
                  if(newList.folderName) return Folder.findOne({name: newList.folderName}, (error, oldFolder) => {
                     if(error || !oldFolder) return next(error);
                     oldFolder.files.pull(newList.id);
                     oldFolder.save(error => {
                        if(error) return next(error);
                        if(folderName === "-- No Folder --"){
                           newList.set({folderName: null});
                           return newList.save((error, updatedList) => {
                                    if(error) return next(error);
                                    return res.status(200).json(updatedList); 
                                 });
                        }
                        else if(folderName){
                           newFolder.files.push(newList.id);
                           newFolder.save(error => {
                              if(error) return next(error)
                              newList.set({folderName});
                              return newList.save((error, updatedList) => {
                                       if(error) return next(error);
                                       return res.status(200).json(updatedList); 
                                    });
                           });
                        }
                     })
                  });
                  else if(folderName){
                     newFolder.files.push(newList.id);
                     return newFolder.save(error => {
                              if(error) return next(error)
                              newList.set({folderName});
                              return newList.save((error, updatedList) => {
                                       if(error) return next(error);
                                       return res.status(200).json(updatedList); 
                                    });
                           });
                  }
               }
               res.status(200).json(newList); 
            })
   }).populate("creator").exec();  
}

exports.delete = (req, res, next) => {
   TodoList.findByIdAndRemove(req.params.id)
      .then(list => {
         if(!list) throw new Error("Not Found");
         if(!list.folderName) return;
         return Folder.findOne({name: list.folderName})
      })
      .then(folder => {
         if(!folder) return;
         folder.files.pull(req.params.id);
         return folder.save();
      })
      .then(resolve => Todo.deleteMany({container: req.params.id}))
      .then(todos => res.status(200).json({message: "Todo List Removed Successfully"}))
      .catch(error => {
         error.status = 404;
         return next(error);
      })
}

module.exports = exports;