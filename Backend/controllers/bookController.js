const express = require("express");
const router = express.Router();
const {
  BookStatusDelivered,
} = require("../middleware/emailBookSender");

const {
  getById,
  createBook,
  updateBook,
} = require("../services/bookService");

const { verifyAccessToken } = require("../middleware/auth");

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  
  try {
    const book = await getById(id);

    if (!book) {
      res.status(404).json({
        message: "No Book found",
      });
    } else {
      res.status(200).json(book);
    }
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
});

router.post("/create", async (req, res) => {
  // add auto-generated BookVS
  const title = req.body.title.trim();
  const chapters = req.body.chapter;
  const summary = req.body.summary.trim();

  if (req.body) {
    const bookData = {
      title,
      chapters,
      summary,
      author: 'Pavleta Taseva',
    };

    try {
      const newBook = await createBook(bookData);

      if (!newBook) {
        res.status(404).json({
          message: "Book not created",
        });
      } else {
        res.status(200).json(newBook);
      }
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }
});

router.put("/update/:id", async (req, res) => {
  if (req.body) {
    try {
      const updatedBook = await updateBook(
        req.params.id,
        req.body.BookStatus
      );

      if (!updatedBook) {
        res.status(404).json({
          message: "Book not updated",
        });
      } else {
        if (req.body.BookStatus === "delivered") {
          BookStatusDelivered(updatedBook);
        }
        res.status(200).json(updatedBook);
      }
    } catch (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
  }
});

module.exports = router;
