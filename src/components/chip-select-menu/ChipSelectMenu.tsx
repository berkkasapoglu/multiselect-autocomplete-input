import classes from './ChipSelectMenu.module.scss';
import { IMenuItem } from '../menu-item/MenuItem.types';
import MenuItem from '../menu-item/MenuItem';

interface IProps {
  style?: React.CSSProperties;
  items: IMenuItem[];
}

function ChipSelectMenu({ style, items }: IProps) {
  return (
    <div style={style} className={classes.menu}>
      {items.map((item) => (
        <MenuItem item={item}>{item.element}</MenuItem>
      ))}
    </div>
  );
}
export default ChipSelectMenu;
