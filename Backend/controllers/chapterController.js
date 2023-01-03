const express = require("express");
const router = express.Router();

const {
  getAll,
  getById,
  createChapter,
  updateChapter,
} = require("../services/chapterService");
const { updateBook } = require("../services/bookService");

const { verifyAccessToken } = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const Chapters = await getAll();

    if (!Chapters) {
      res.status(404).json({
        message: "No Chapters found",
      });
    } else {
      res.status(200).json(Chapters);
    }
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const chapter = await getById(id);

    if (!chapter) {
      res.status(404).json({
        message: "No Chapter found",
      });
    } else {
      res.status(200).json(chapter);
    }
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
});

router.post("/add", async (req, res) => {
  const totalChapters = await getAll();
  const totalChaptersLength = totalChapters.length;
  const chapterTitle = req.body.title;
  const chapterContent = req.body.chapterContent;
  const bookId = process.env.BOOK_ID;

  if (req.body) {
    const chapterData = {
      chapterNumber: Number(totalChaptersLength + 1),
      chapterTitle,
      chapterContent,
    };
    try {
      const newChapter = await createChapter(chapterData);
     
      if (!newChapter) {
        res.status(404).json({
          message: "Chapter not created",
        });
      } else {
        await updateBook(bookId, newChapter);
        res.status(200).json(newChapter);
      }
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }
});

router.put("/update/:id", verifyAccessToken, async (req, res) => {
  if (req.body) {
    try {
      const updatedChapter = await updateChapter(
        req.params.id,
        req.body.ChapterStatus
      );

      if (!updatedChapter) {
        res.status(404).json({
          message: "Chapter not updated",
        });
      } else {
        if (req.body.ChapterStatus === "delivered") {
          ChapterStatusDelivered(updatedChapter);
        }
        res.status(200).json(updatedChapter);
      }
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }
});

module.exports = router;
