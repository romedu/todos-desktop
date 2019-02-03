const router = require("express").Router(),
      helpers = require("../helpers/services");

router.post("/sendMessage", helpers.sendMessage);

module.exports = router;