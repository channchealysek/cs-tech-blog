const { Post } = require('../models');

const postdata =
[
  {
    "postTitle": "Beautiful Day",
    "postContent": "This is a beautiful day",
    "userId": 1
  },
  {
    "postTitle": "Fields",
    "postContent": "This is the greenest field",
    "userId": 2
  },
  {
    "postTitle": "Do you hear it?",
    "postContent": "This is very musical, listen!",
    "userId": 3
  }
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;