import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const FormStyle = styled.form`
  display: grid;
  grid-gap: 1rem;

  & button {
    background: #b1d7ff;
    color: #032d5a;
    border: none;
    padding: 1rem 3rem;
    border-radius: 1000px;

    &:hover {
      background: #95c6f9;
    }
  }
`;

const ChatInput = ({ onSubmitMessage }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    onSubmitMessage(data);
  };

  return (
    <FormStyle onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        name="name"
        ref={register}
        placeholder="Enter name..."
      />

      <label htmlFor="message">Message:</label>
      <textarea
        name="message"
        ref={register}
        placeholder="Enter a message..."
      />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button type="submit">Submit</button>
      </div>
    </FormStyle>
  );
};

export default ChatInput;
