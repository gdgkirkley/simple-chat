import * as React from "react";
import Chat from "./components/Chat";
import styled from "styled-components";

const AppStyle = styled.div`
  box-sizing: border-box;
  font-size: 18px;
  & main {
    margin: 2rem auto 4rem;
    max-width: 90vw;
    width: 900px;
    z-index: 2;

    & h1 {
      &:nth-of-type(1) {
        margin: 2rem 0;
      }
    }
  }
`;

function App() {
  const [welcome, setWelcome] = React.useState("");

  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:4000/`, {
        method: "get",
      });

      if (response.ok) {
        const data = await response.json();
        setWelcome(data.message);
      }
    }

    fetchData();
  }, []);

  return (
    <AppStyle>
      <main>
        <Chat welcome={welcome} />
      </main>
    </AppStyle>
  );
}

export default App;
