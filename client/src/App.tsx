import React, { useState } from 'react';
import { Dashboard } from './containers/Dashboard';
import { Header } from './components/Layout/Header';
import { ClassesTabs } from './components/ClassesTabs';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './graphql/client';

export enum ClassEnum {
  All = 'All',
  Rogue = 'Rogue',
  Warrior = 'Warrior',
  Druid = 'Druid',
  Mage = 'Mage',
  Priest = 'Priest',
  Paladin = 'Paladin',
  Shaman = 'Shaman',
  Warlock = 'Warlock',
  Hunter = 'Hunter',
}

const App = () => {
  const [currentFilter, setFilter] = useState(ClassEnum.All);
  return (
    <ApolloProvider client={client}>
      <Header />
      <ClassesTabs currentFilter={currentFilter} setFilter={setFilter} />
      <Dashboard currentFilter={currentFilter} />
    </ApolloProvider>
  );
};

export default App;
