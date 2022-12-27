import React from 'react';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import CreateIcon from '@mui/icons-material/Create';
import { FormContainer, Input, Heading, StyledButton, InputContainer } from './styled';

const Form = () => (
  <div>
    <Heading>Add new chapter to "Magesnitza"</Heading>
    <FormContainer>
      <InputContainer>
        <CreateIcon sx={{ marginBottom: '20px', color: '#00bcd5'}}/>
        <Input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Chapter name"
        />
      </InputContainer>
      <TextareaAutosize
        id="message"
        name="message"
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
      />
      <StyledButton type="submit">Send</StyledButton>
    </FormContainer>
  </div>
);

export default Form;