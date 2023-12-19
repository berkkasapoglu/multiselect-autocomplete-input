import classes from './CharacterMenuItem.module.scss';
import { ICharacter } from './CharacterMenuItem.types';

interface IProps {
  data: ICharacter;
}

function CharacterMenuItem({ data }: IProps) {
  return (
    <div className={classes.item}>
      <img src={data.image} alt="" className={classes.img} />
      <div className={classes.info}>
        <h3 className={classes.title}>{data.name}</h3>
        <p className={classes.count}>{data.episodeCount} episodes</p>
      </div>
    </div>
  );
}
export default CharacterMenuItem;
