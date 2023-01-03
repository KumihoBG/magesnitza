const Book = require('../models/Book.js');

async function getById(id) {
    const book = await Book.findById(id).lean();

    return book;
}

async function createBook(BookData) {
    const newBook = new Book(BookData);

    await newBook.save();

    return newBook;
}

async function getBookCount() {
    const today = new Date();
    let todayUTC = new Date(
      Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
    );
    const books = await Book.find({date:todayUTC}).lean().countDocuments();
    
    return books;
}

async function updateBook(id, newChapter) {
    const book = await Book.findById(id);

    book.chapters.push(newChapter);

    await book.save();

    return book;
}

module.exports = {
    getById,
    createBook,
    getBookCount,
    updateBook,
}