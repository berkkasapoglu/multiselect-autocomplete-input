import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Chip.module.scss';
import { IChip } from './Chip.types';

interface IProps {
  chip: IChip;
  onDelete: (id: string) => void;
  removeable?: boolean;
}

function Chip({ chip, onDelete, removeable = true }: IProps) {
  return (
    <div className={classes.option}>
      {chip.label}
      {removeable && (
        <FontAwesomeIcon
          icon={faSquareXmark}
          onClick={() => onDelete(chip.id)}
          className={classes.closeIcon}
        />
      )}
    </div>
  );
}
export default Chip;
