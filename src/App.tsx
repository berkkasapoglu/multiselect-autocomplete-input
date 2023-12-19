import classes from './App.module.scss';
import MultiSelect from './components/multiselect/MultiSelect';
import { useQuery } from 'react-query';
import getCharacters from './services/get-characters';
import CharacterMenuItem from './components/character-menu-item/CharacterMenuItem';

function App() {
  const { data, error, isLoading } = useQuery('characters', getCharacters, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return null;
  console.log('data', data.results);

  return (
    <div className={classes.container}>
      <MultiSelect
        menuItems={data.results.map((item: any) => ({
          selected: true,
          element: <CharacterMenuItem data={item} />,
          onSelect: () => {},
        }))}
      />
    </div>
  );
}

export default App;
