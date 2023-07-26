const express = require("express");
const { User } = require("../models/user");
const { Post } = require("../models/posts");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/all-posts", auth, async (req, res) => {
  try {
    const data = await Post.find()
      .sort({ createdAt: -1 })
      .populate("userId", "_id name email");
    res.send({ success: true, message: "Posts fetched", data });
  } catch (err) {
    console.log(err);
    res.send({ success: false, message: "Error fetching posts", err });
  }
});

router.post("/add-post", auth, upload, async (req, res) => {
  console.log("inside");
  const { description, type } = req.body;
  const { path } = req.file;
  const { _id: userId } = req.user;

  try {
    const newPost = new Post({
      path,
      description,
      type,
      likes: [],
      comments: [],
      userId,
    });
    const data = await newPost.save();

    res.send({ success: true, message: "Post uploaded successfully", data });
  } catch (error) {
    res.send({ success: false, message: "Error uploading post", error });
  }
});

router.put("/like/:post_id", auth, async (req, res) => {
  const { _id: userId } = req.user;
  const { post_id: postId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      res.send({ success: false, message: "Post not found" });
    }

    const currentLikes = post.likes;
    const alreadyLiked = currentLikes.find((user) => user === userId);
    if (alreadyLiked) {
      post.likes = currentLikes.filter((user) => user !== userId);
    } else {
      post.likes = [...post.likes, userId];
    }

    await post.save();
    res.send({
      success: true,
      message: "Like action done",
      added: !alreadyLiked,
    });
  } catch (err) {
    res.send({ success: false, message: "Error adding a like", err });
  }
});

module.exports = router;
