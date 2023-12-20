import { useState } from 'react';
import { useQuery } from 'react-query';
import CharacterMenuItem from './components/character-menu-item/CharacterMenuItem';
import { IMenuItem } from '../../components/menu-item/MenuItem.types';
import MultiSelect from '../../components/multiselect/MultiSelect';
import convertCharacterToMenuItem, {
  TCharacterResponse,
  TCharacterResponseData,
} from '../../helpers/convert-character-to-menuItem';
import getCharactersByName from '../../services/get-characters';
import { AxiosError } from 'axios';

function Home() {
  const [inputValue, setInputValue] = useState<string>('');

  const { data, error, isLoading } = useQuery<
    TCharacterResponse,
    AxiosError<{ error: string }>
  >(['characters', inputValue], () => getCharactersByName(inputValue), {
    retry: false,
    refetchOnWindowFocus: false,
  });

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
    <>
      <MultiSelect
        menuItems={getMenuItems()}
        onChange={(value) => {
          setInputValue(value);
        }}
        isLoading={isLoading}
        error={error?.response?.data?.error}
      />
    </>
  );
}
export default Home;
