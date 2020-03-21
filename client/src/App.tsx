import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "./graphql/client";
import { RaidersList } from "./components/RaidersList";
import styled from "styled-components";

const AppSection = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #282c34;
`;

const AppHeader = styled.header`
  height: 15vh;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: center;
  height: 70vh;
`;

const AppFooter = styled.footer`
  height: 15vh;
`;

const WidgetPanel = styled.div`
  background-color: ghostwhite;
  border: 1px solid lightgrey;
  overflow: auto;
  height: calc(100% - 20px);
  margin: 10px;
  border-radius: 5px;
  width: 350px;
`;

const App = () => (
  <ApolloProvider client={client}>
    <AppSection>
      <AppHeader>
        <h1>FDS CLASSIC CS</h1>
      </AppHeader>
      <MainContent>
        <WidgetPanel>
          <RaidersList />
        </WidgetPanel>
        <WidgetPanel>
          WIP :(
        </WidgetPanel>
      </MainContent>
      <AppFooter>Frères de Sang 2020</AppFooter>
    </AppSection>
  </ApolloProvider>
);

export default App;
