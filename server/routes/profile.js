const express = require('express');
const router = express.Router();
const resourceController = require('../../db/controllers/resource.js');
const userController = require('../../db/controllers/user.js');
const commentController = require('../../db/controllers/comment.js');

// gets data for user's profile page
// TODO: rewrite all this bullshit
router.get('/', (req, res, next) => {
  const profile = {};
      // get all comments submitted by a user and the resource that its on
  commentController.findCommentsByUserId(req.user._id)
        .sort('-createdAt')
        .populate('resource')
        .then((comments) => {
          profile.comments = comments;
          // get the user's array of favorites
          userController.findUserById(req.user._id)
           .then((user) => {
             resourceController.findFavorites(user.favorites)
               .then((favorites) => {
                 profile.favorites = favorites;
                 res.status(201).send(profile);
               })
                .catch((err) => {
                  console.error(err);
                });
           })
        .catch((err) => {
          console.error(err);
        })
      })
});

// retrieves user data for user authenticated via github
router.get('/user', (req, res) => {
  if (req.user) {
    const userData = { name: req.user.name,
      username: req.user.username,
      password: '',
      admin: req.user.admin,
      avatar: req.user.avatar || null,
      _id: req.user._id,
      favorites: req.user.favorites };

    res.status(200).send(userData);
  } else {
    res.send(null);
  }
});

module.exports = router;
