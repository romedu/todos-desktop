const router  = require("express").Router(),
      helpers = require("../helpers/todoList"),
      {todos} = require("../middlewares");

router.route("/")
   .get(helpers.find)
   .post(todos.checkIfFolderOwner, helpers.create);

router.route("/:id")
   .all(todos.checkPermission)
   .get(helpers.findOne)
   .patch(todos.ownerOnly, todos.checkIfFolderOwner, helpers.update)
   .delete(todos.ownerPrivileges, helpers.delete);

module.exports = router;