import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import ChatInput from "./ChatInput";
import Message, { formatDate } from "./Message";

const ChatBox = styled.div`
  border: 1px solid #ececec;
  margin: 1rem 0;
  padding: 0 2rem;
  height: 300px;
  overflow-y: scroll;

  & div {
    margin-bottom: 1rem;
    &:first-of-type {
      margin-top: 1rem;
    }
  }
`;

const chatURL = "ws://localhost:4000";

const Chat = ({ welcome }) => {
  const [name, setName] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  const { id } = useParams();
  const [ws, setWS] = React.useState(new WebSocket(`${chatURL}/${id}`));
  const chatbox = React.useRef(null);

  React.useEffect(() => {
    ws.onopen = () => {
      console.log("connected");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((messages) => [...messages, message]);
    };

    ws.onclose = () => {
      console.log("disconnected");
      // try to reconnect
      setWS(new WebSocket(chatURL));
    };
  }, [ws]);

  React.useEffect(() => {
    updateScroll();
  }, [messages]);

  function updateScroll() {
    if (chatbox.current) {
      chatbox.current.scrollTop = chatbox.current.scrollHeight;
    }
  }

  const handleMessageSubmit = (data) => {
    console.log(data);
    setName(data.name);
    ws.send(JSON.stringify({ ...data, date: new Date() }));
  };

  return (
    <div>
      <h1>Chat</h1>
      <ChatBox ref={chatbox}>
        {welcome ? <div>{welcome}</div> : null}
        {messages?.length
          ? messages.map((message) => (
              <Message
                key={message.name}
                name={message.name}
                message={message.message}
                date={message.date}
                system={message.system}
              />
            ))
          : null}
      </ChatBox>
      <ChatInput onSubmitMessage={handleMessageSubmit} />
    </div>
  );
};

export default Chat;
