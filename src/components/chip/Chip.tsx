import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import classes from './Chip.module.scss';
import { IChip } from './Chip.types';

interface IProps {
  chip: IChip;
  onDelete: (id: string) => void;
  removeable?: boolean;
  focused?: boolean;
}

function Chip({ chip, onDelete, removeable = true, focused = false }: IProps) {
  return (
    <div
      className={classNames(classes.chip, { [`${classes.focus}`]: focused })}
    >
      <p>{chip.label}</p>

      {removeable && (
        <FontAwesomeIcon
          icon={faSquareXmark}
          className={classes.closeIcon}
          onClick={(e) => {
            onDelete(chip.id);
            e.stopPropagation();
          }}
        />
      )}
    </div>
  );
}
export default Chip;
