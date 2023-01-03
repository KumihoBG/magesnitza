import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { getData, getChapterById } from "../../pages/api/data";
import { BookTitle, Label, Select, Content, Summary, Text } from "./styled";

const Book = () => {
  const [chapter, setChapter] = React.useState({});
  const [chapters, setChapters] = React.useState([]);
  const [book, setBook] = React.useState({});
  const [chapterContent, setChapterContent] = React.useState([]);
  const chapterList = [];

  const getBook = async () => {
    const book = await getData();
    setChapters(book.chapters);
    setBook(book);
  };

  const getChapter = async (id) => {
    const chapter = await getChapterById(id);
    setChapter(chapter);
    return chapter;
  };

  React.useEffect(() => {
    getBook();

    chapters?.map(async (chapter) => {
      const currentChapter = await getChapter(chapter);
      chapterList.push(currentChapter);
      const sortedChapterList = chapterList.sort(
        (a, b) => a.chapterNumber - b.chapterNumber
      );
      setChapterContent(sortedChapterList);
    });
  }, []);

  const handleChange = async (e) => {
    const chapterId = e?.target?.value;
    const chapter = await getChapter(chapterId);
    return chapter;
  };
  console.log('chapterContent: ', chapterContent);
  console.log('chapter: ', chapter);
  console.log('chapters: ', chapters);
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
          <h1>{chapter.chapterTitle}</h1>
          <Content>{chapter.chapterContent}</Content>
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
