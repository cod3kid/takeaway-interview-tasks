const mongoose = require("mongoose");

const Post = mongoose.model(
  "Post",
  new mongoose.Schema(
    {
      path: {
        type: String,
        max: 300,
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
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);

exports.Post = Post;
