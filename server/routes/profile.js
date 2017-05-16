const express = require('express');
const router = express.Router();
const userController = require('../../db/controllers/user.js');

// gets data for user's profile page
// TODO: rewrite all this bullshit
router.get('/', (req, res, next) => {
  const profile = {};
      // get all comments submitted by a user and the resource that its on
});

module.exports = router;
