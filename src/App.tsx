import { useState } from 'react';
import classes from './App.module.scss';
import { IMenuItem } from './components/menu-item/MenuItem.types';
import MultiSelect from './components/multiselect/MultiSelect';
import { useQuery } from 'react-query';
import getCharacters from './services/get-characters';

function App() {
  const { data, error, isLoading } = useQuery('characters', getCharacters, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className={classes.container}>
      <MultiSelect
        menuItems={[
          { selected: true, element: <p>test1</p>, onSelect: () => {} },
          { selected: false, element: <p>test2</p>, onSelect: () => {} },
        ]}
      />
    </div>
  );
}

export default App;
