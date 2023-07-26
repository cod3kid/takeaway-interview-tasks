const mongoose = require("mongoose");

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    user_id: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      max: 500,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      required: true,
    },
    comments: {
      type: Array,
      required: true,
    },
  })
);

exports.Post = Post;
