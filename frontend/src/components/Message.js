import React from "react";
import styled from "styled-components";

const MessageStyle = styled.div`
  display: grid;
`;

const MessageInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-weight: 600;
  color: #999;
`;

const Username = styled.span`
  font-weight: bold;
  color: #222;
`;

const MessageDate = styled.span`
  text-align: right;
`;

const MessageText = styled.div`
  margin: 5px 0px;
  line-height: 1.5;
`;

const Message = ({ name, message, date }) => {
  return (
    <MessageStyle>
      <MessageInfo>
        <Username>{name}</Username>
        <MessageDate>{formatDate(date)}</MessageDate>
      </MessageInfo>
      <MessageText>{message}</MessageText>
    </MessageStyle>
  );
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
};

export default Message;
