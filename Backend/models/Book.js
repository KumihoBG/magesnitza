const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  chapters: [
    {
      type: Schema.Types.ObjectId,
      ref: "Chapter",
      default: [],
    },
  ],
  author: {
    type: String,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      name: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = model("Book", bookSchema);
