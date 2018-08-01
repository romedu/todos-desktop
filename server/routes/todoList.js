const router  = require("express").Router(),
      helpers = require("../helpers/todoList"),
      {todos} = require("../middlewares");

router.route("/")
   .get(helpers.findAll)
   .post(helpers.create);

router.route("/:id")
   .all(todos.checkPermission)
   .get(helpers.findOne)
   .patch(todos.ownerOnly, helpers.update)
   .delete(todos.ownerPrivileges, helpers.delete);

module.exports = router;