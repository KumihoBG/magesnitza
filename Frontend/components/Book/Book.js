import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { getData, getChapterById } from "../../pages/api/data";
import { BookTitle, Label, Select, Content, Summary, Text } from "./styled";

const Book = () => {
  const [book, setBook] = useState({});
  const [chapter, setChapter] = useState({});
  const [chapterContent, setChapterContent] = useState([]);
  const chapterList = [];
  let sortedChapterList = [];

  const getBook = async () => {
    const book = await getData();
    setBook(book);
    const chapters = book?.chapters;

    for (let chapter of chapters) {
      const currentChapter = await getChapterById(chapter);
      chapterList.push(currentChapter);
    }

    sortedChapterList = chapterList.sort(
      (a, b) => a.chapterNumber - b.chapterNumber
      );

      setChapterContent(sortedChapterList);
      return {
        book,
        sortedChapterList
      }
  };

  const getChapter = async (id) => {
    const chapter = await getChapterById(id);
    setChapter(chapter);
    return chapter;
  };

  useEffect(() => {
    getBook();
  }, []);

  const handleChange = async (e) => {
    const chapterId = e?.target?.value;
    const chapter = await getChapter(chapterId);
    return chapter;
  };

  return (
    <>
      <BookTitle>{book.title}</BookTitle>
      <Text>All Rights Reserved &copy;</Text>
      <Summary>{book.summary}</Summary>
      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          padding: "2%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFF",
            width: "800px",
            minHeight: "1000px",
            height: "auto",
            marginLeft: "5%",
            padding: "2%",
            borderRadius: "10px",
            backgroundColor: "transparent",
            lineHeight: "1.5",
            textAlign: "justify",
            fontSize: "18px",
          }}
        >
          <h1>{chapter.chapterTitle || chapterContent[0]?.chapterTitle}</h1>
          <Content>{chapter.chapterContent || chapterContent[0]?.chapterContent}</Content>
        </Box>
        <Box sx={{ marginLeft: "2%", width: "400px" }}>
          <Label htmlFor="dropDownMenu">
            <Select
              id="dropDownMenu"
              name="dropDownMenu"
              onChange={(e) => handleChange(e)}
            >
              {chapterContent?.map((chapter) => (
                <option key={chapter._id} value={chapter._id}>
                  {`${chapter.chapterNumber}. ${chapter.chapterTitle}`}
                </option>
              ))}
            </Select>
          </Label>
        </Box>
      </Grid>
    </>
  );
};

export default Book;
