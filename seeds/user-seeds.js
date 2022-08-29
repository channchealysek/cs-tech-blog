const { Post } = require('../models');

const postdata =
[
  {
    postTitle: "if a string is equal to a value",
    postContent: "Is it possible in Handlebars to check if a string is equal to another value without registering a helper?",
    user_id: 1
  },
  {
    postTitle: "What is Handlebars.js",
    postContent: "Handlebars compiles templates into JavaScript functions. This makes the template execution faster than most other template engines.",
    user_id: 2
  },
  {
    postTitle: "Handlebars registerHelper serverside with Expressjs",
    postContent: "Where to store custom Handlebars helpers in an Express app? Hot Network Questions · Did most or just few physicists think in 1900 that there was ...",
    user_id: 3
  }
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;