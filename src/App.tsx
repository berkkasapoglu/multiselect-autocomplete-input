import classes from './App.module.scss';
import MultiSelect from './components/multiselect/MultiSelect';
import { useQuery } from 'react-query';
import CharacterMenuItem from './components/character-menu-item/CharacterMenuItem';
import convertCharacterToMenuItem, {
  TCharacterResponse,
  TCharacterResponseData,
} from './helpers/convert-character-to-menuItem';
import getCharactersByName from './services/get-characters';
import { useState } from 'react';
import { IMenuItem } from './components/menu-item/MenuItem.types';

function App() {
  const [inputValue, setInputValue] = useState<string>('');

  const { data, error, isLoading } = useQuery<TCharacterResponse>(
    ['characters', inputValue],
    () => getCharactersByName(inputValue),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const getMenuItems = (): IMenuItem[] => {
    if (!data) return [];

    return data.results.map((item: TCharacterResponseData) => ({
      label: item.name,
      id: item.id,
      element: (
        <CharacterMenuItem
          data={convertCharacterToMenuItem(item)}
          inputValue={inputValue}
        />
      ),
    }));
  };

  return (
    <div className={classes.container}>
      <MultiSelect
        menuItems={getMenuItems()}
        onChange={(value) => {
          setInputValue(value);
        }}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
