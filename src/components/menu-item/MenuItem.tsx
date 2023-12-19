import { IMenuItem } from './MenuItem.types';
import classes from './MenuItem.module.scss';
import { IChipMenuProps } from '../chip-select-menu/ChipSelectMenu';

interface IProps {
  children: React.ReactNode;
  item: IMenuItem;
  onClick: IChipMenuProps['onClick'];
  chips: IChipMenuProps['chips'];
}

function MenuItem({ children, item, onClick, chips }: IProps) {
  const isItemSelected = chips.some((chip) => chip.id === item.id);

  return (
    <li className={classes.item} onClick={() => onClick(item)}>
      <input
        type="checkbox"
        checked={isItemSelected}
        className={classes.checkbox}
      />
      {children}
    </li>
  );
}
export default MenuItem;
