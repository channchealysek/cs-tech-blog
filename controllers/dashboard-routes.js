const router = require("express").Router();
const { Post, User } = require("../models/");
const withAuth = require("../utils/auth");

// get all posts
router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {  user_id: req.session.user_id },
      include: [      {
        model: User,
        attributes: ['username']
      }],
    });
    const posts = postData.map(post => post.get({ plain: true }));
    console.log(posts)
    res.render("user-posts", {
      layout: "dashboard",
      posts,
      username:req.session.username
    });

  } catch (err) {
    res.redirect("login");
  }
});

module.exports = router;
