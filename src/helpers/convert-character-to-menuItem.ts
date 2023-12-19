import { ICharacter } from '../components/character-menu-item/CharacterMenuItem';

type TCharacterResponse = {
  image: string;
  name: string;
  episodes: string[];
} & Record<string, any>;

const convertCharacterToMenuItem = (characterData: TCharacterResponse[]) => {
  return characterData.map((item) => ({
    image: item.image,
    name: item.name,
    episodeCount: item.episodes.length,
  }));
};

export default convertCharacterToMenuItem;
