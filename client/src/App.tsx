import React, { useState } from "react";
import store from "./redux/store";
import { Provider } from "react-redux";
import SongList from "./Components/SongList";
import Stats from "./Components/Stats";
import styled from "@emotion/styled";

const Container = styled.div`
  
  background-color: rgba(10, 10, 10, 0.9); 
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
`;

const App: React.FC = () => {
  const [songChangeDependency, setSongChangeDependency] = useState(false);

  const handleSongChange = () => {
    setSongChangeDependency(!songChangeDependency);
  };

  return (
    <Provider store={store}>
      <Container>
        <Stats dependency={songChangeDependency} />
        <SongList onSongChange={handleSongChange} />
      </Container>
    </Provider>
  );
};

export default App;
