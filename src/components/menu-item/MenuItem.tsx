import { IMenuItem } from './MenuItem.types';
import classes from './MenuItem.module.scss';

interface IProps {
  children: React.ReactNode;
  item: IMenuItem;
}

function MenuItem({ children, item }: IProps) {
  return (
    <div className={classes.item} onClick={item.onSelect}>
      <input
        type="checkbox"
        checked={item.selected}
        className={classes.checkbox}
      />
      {children}
    </div>
  );
}
export default MenuItem;
