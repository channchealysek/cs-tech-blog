const router = require("express").Router();
const { Post, User, Comment } = require("../models/");
const withAuth = require("../utils/auth.js");

// get all posts
router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("user-posts", {
      layout: "dashboard",
      posts,
      username: req.session.username,
    });
  } catch (err) {
    res.redirect("login");
  }
});

// load new create form for new post when click create new
router.get("/newpost", withAuth, (req, res) => {
  res.render("new-post", {
    layout: "dashboard",
  });
});

// it will load to edit form when click on post itself.
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });
      res.render("edit-post", {
        layout: "dashboard",
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect("login");
  }
});

// comment will load to edit form when click on post itself.
router.get("/comment/edit/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id);

    if (commentData) {
      const comment = commentData.get({ plain: true });
      res.render("edit-comment", {
        layout: "dashboard",
        comment,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect("login");
  }
});

module.exports = router;
