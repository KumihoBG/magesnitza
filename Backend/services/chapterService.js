const Chapter = require('../models/Chapter.js');

async function getAll() {
    const chapters = await Chapter.find().lean();

    return chapters;
}

async function getById(id) {
    const chapter = await Chapter.findById(id).lean();

    return chapter;
}

async function createChapter(ChapterData) {
    const newChapter = new Chapter(ChapterData);

    await newChapter.save();

    return newChapter;
}

async function updateChapter(id, ChapterStatus) {
    const chapter = await Chapter.findById(id);

    chapter.ChapterStatus = ChapterStatus;
    chapter.ChapterStatusHistory.push({
        ChapterStatus,
        dateTime: Date.now()
    });

    await chapter.save();

    return chapter;
}

module.exports = {
    getAll,
    getById,
    createChapter,
    updateChapter,
}