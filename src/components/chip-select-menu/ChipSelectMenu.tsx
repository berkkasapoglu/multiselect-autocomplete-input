import classes from './ChipSelectMenu.module.scss';
import { IMenuItem } from '../menu-item/MenuItem.types';
import MenuItem from '../menu-item/MenuItem';
import { IChip } from '../chip/Chip.types';

export interface IChipMenuProps {
  items: IMenuItem[];
  onClick: (item: IMenuItem) => void;
  isLoading?: boolean;
  style?: React.CSSProperties;
  chips: IChip[];
}

function ChipSelectMenu({
  style,
  items,
  isLoading,
  onClick,
  chips,
}: IChipMenuProps) {
  return (
    <ul style={style} className={classes.menu}>
      {isLoading && <p>Loading...</p>}

      {!isLoading &&
        items.map((item) => (
          <MenuItem item={item} onClick={onClick} chips={chips}>
            {item.element}
          </MenuItem>
        ))}
    </ul>
  );
}
export default ChipSelectMenu;
