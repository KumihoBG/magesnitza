const { Schema, model } = require("mongoose");

const chapterSchema = new Schema({
    chapterNumber: {
        type: Number,
    },
    chapterTitle: {
        type: String,
        required: true,
    },
    chapterContent: {
        type: String,
        required: true,
    },
});


module.exports = model("Chapter", chapterSchema);