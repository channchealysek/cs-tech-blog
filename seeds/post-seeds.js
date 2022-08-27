const { Post } = require('../models');

const postdata =
[
  {
    postTitle: "Beautiful Day",
    postContent: "This is a beautiful day",
    user_id: 1
  },
  {
    postTitle: "Donec diam",
    postContent: "'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.",
    user_id: 2
  },
  {
    postTitle: "Do you hear it?",
    postContent: "This is very musical, listen!",
    user_id: 3
  }
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;