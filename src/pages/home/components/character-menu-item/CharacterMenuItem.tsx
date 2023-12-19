import classes from './CharacterMenuItem.module.scss';
import { ICharacter } from './CharacterMenuItem.types';

interface IProps {
  data: ICharacter;
  inputValue: string;
}

function CharacterMenuItem({ data, inputValue }: IProps) {
  const startIndex = data.name.toLowerCase().indexOf(inputValue);
  const endIndex = startIndex + inputValue.length;

  const nameParts = {
    begin: data.name.slice(0, startIndex),
    match: data.name.slice(startIndex, endIndex),
    end: data.name.slice(endIndex),
  };

  return (
    <div className={classes.item}>
      <img src={data.image} alt="" className={classes.img} />
      <div className={classes.info}>
        <h3 className={classes.title}>
          {nameParts.begin}
          <span className={classes.strong}>{nameParts.match}</span>
          {nameParts.end}
        </h3>
        <p className={classes.count}>{data.episodeCount} episodes</p>
      </div>
    </div>
  );
}
export default CharacterMenuItem;
