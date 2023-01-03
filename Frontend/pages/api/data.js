const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const BOOK_ID = process.env.NEXT_PUBLIC_BOOK_ID;

export async function getData() {
  const res = await fetch(`${BASE_URL}/book/${BOOK_ID}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export async function createChapter(chapterData) {

  const res = await fetch(`${BASE_URL}/chapter/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(chapterData),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const chapter = await res.json();
  return chapter;
}

export async function getChapterById(chapterId) {

  const res = await fetch(`${BASE_URL}/chapter/${chapterId}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const chapter = await res.json();
  return chapter;
}