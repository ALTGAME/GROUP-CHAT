const express = require('express');
const { registerUser, authUser, allUsers } = require("../controllers/userController");

  const router = express.Router()

  router.route("/").post(registerUser).get(/*protect*/allUsers);
  router.route('/login', authUser);

  module.exports = router;

