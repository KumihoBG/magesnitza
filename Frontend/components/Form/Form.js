import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import CreateIcon from '@mui/icons-material/Create';
import { FormContainer, Input, Heading, StyledButton, InputContainer } from './styled';
import { createChapter } from '../../pages/api/data';

const Form = () => {
  const router = useRouter();
  const [title, setTitle] = useState();
  const [chapterContent, setChapterContent] = useState();

  const handleChangeTitle = (e) => {
    setTitle(e.target.value,);
  };

  const handleChangeContent = (e) => {
    setChapterContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newChapter = {
      title,
      chapterContent,
    }

    const chapter = await createChapter(newChapter);
    router.push('/');
    return chapter;
  };
    
  return (
  <div>
    <Heading>Add new chapter to "Magesnitza"</Heading>
    <FormContainer>
      <InputContainer>
        <CreateIcon sx={{ marginBottom: '20px', color: '#00bcd5'}}/>
        <Input
          type="text"
          id="title"
          name="title"
          required
          placeholder="Chapter name"
          onChange={(e) => handleChangeTitle(e)}
        />
      </InputContainer>
      <TextareaAutosize
        id="chapterContent"
        name="chapterContent"
        minRows={50}
        placeholder="Once upon a time..."
        style={{
          width: 900,
          height: 600,
          newline: 'pre-wrap',
          padding: 10,
          borderRadius: 10,
          border: '5px solid #00bcd5',
          outline: 'none',
          fontSize: 18,
          overflowX: 'none',
          background: '#202124',
          color: '#fff',
          marginLeft: 50,
          resize: "none",
        }}
        onChange={(e) => handleChangeContent(e)}
      />
      <StyledButton type="submit" onClick={handleSubmit}>Send</StyledButton>
    </FormContainer>
  </div>
  );
}

export default Form;
