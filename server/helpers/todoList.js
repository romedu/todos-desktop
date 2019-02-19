const {TodoList, Todo, Folder} = require("../models"),
      {errorHandler} = require("./error");

exports.find = (req, res, next) => {
   const {isAdmin} = req.user,
         {getAll, page, limit, sortProp, sortOrder, folderLess} = req.query,
         searchArg = isAdmin && getAll ? {} : {creator: req.user.id},
         options = {
            sort: {[sortProp]: sortOrder},
            page,
            limit: Number(limit)
         };

   if(folderLess) searchArg.folderName = undefined;

   //Temporary fix for retrieving all the docs
   if(limit){
      TodoList.paginate(searchArg, options)
         .then(foundLists => {
            if(!foundLists) throw new Error("Not Found");
            res.status(200).json(foundLists)
         })
         .catch(error => {
            error.status = 404;
            return next(error);
         });
   } 
   else {
      TodoList.find(searchArg)
         .then(foundLists => {
            if(!foundLists) throw new Error("Not Found");
            res.status(200).json(foundLists)
         })
         .catch(error => {
            error.status = 404;
            return next(error);
         });
   }
};

exports.create = (req, res, next) => {
   const {newFolder, user, body} = req;
   body.creator = user.id

   TodoList.create(body)
      .then(newList => {
         const addons = [newList];
         if(newFolder){
            newFolder.files.push(newList.id);
            addons.push(newFolder.save());
         }
         return Promise.all(addons)
      })
      .then(([newList, response]) => res.status(201).json(newList))
      .catch(error => {
         if(!error.message || error.code === 11000) error = errorHandler(409, "That name is not avaibale, please try another one");
         next(error);
      })
};

exports.findOne = (req, res, next) => {
   TodoList.findOne({_id: req.params.id}).populate("todos").exec()
      .then(list => res.status(200).json(list))
      .catch(error => next(error));
};

exports.update = (req, res, next) => {
   let {folderName, ...updateData} = req.body;
   const options = {
      new: true, 
      runValidators: true
   };   

   return TodoList.findByIdAndUpdate(req.params.id, updateData, options)
            .then(updatedList => {
               const {newFolder} = req;
               
               //Checks if there is no folderName change or if there wasn't a previous folderName
               if(!folderName || !updatedList.folderName || (newFolder && newFolder.name === updatedList.folderName)) return Promise.all([null, updatedList]);
               else return Promise.all([Folder.findOne({name: updatedList.folderName}), updatedList]);
            })
            .then(([oldFolder, updatedList]) => {
               const addons = [],
                     {newFolder} = req;

               if(oldFolder){
                  oldFolder.files.pull(updatedList.id);
                  addons.push(oldFolder.save());
               }
               if(newFolder && newFolder.name !== updatedList.folderName){
                  newFolder.files.push(updatedList.id);
                  updatedList.folderName = newFolder.name;
                  addons.push(newFolder.save());
               }
               else if(oldFolder && folderName === "-- No Folder --") updatedList.folderName = null;

               addons.push(updatedList.save());
               return Promise.all(addons);
            })
            .then(response => res.status(200).json(response[response.length -1]))
            .catch(error => {
               console.log("Found it: ", error);
               next(error);
            }); 
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