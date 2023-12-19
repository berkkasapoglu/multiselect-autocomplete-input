interface RickAndMortyApiResponse<T> {
  info: Record<string, any>;
  results: T[];
}

export type TCharacterResponseData = {
  id: string;
  image: string;
  name: string;
  episode: string[];
} & Record<string, any>;

export type TCharacterResponse =
  RickAndMortyApiResponse<TCharacterResponseData>;

const convertCharacterToMenuItem = (characterData: TCharacterResponseData) => {
  return {
    image: characterData.image,
    name: characterData.name,
    episodeCount: characterData.episode.length,
  };
};

export default convertCharacterToMenuItem;
