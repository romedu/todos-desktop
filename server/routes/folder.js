const router  = require("express").Router(),
      helpers = require("../helpers/folder"),
      {folder} = require("../middlewares");

router.route("/")
   .get(helpers.find)
   .post(helpers.create);

router.route("/:id")
   .all(folder.getCurrentFolder, folder.checkPermission)
   .get(helpers.findOne)
   .patch(helpers.update)
   .delete(folder.ownerPrivileges, helpers.delete);

module.exports = router;