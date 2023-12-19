import { IMenuItem } from './MenuItem.types';
import classes from './MenuItem.module.scss';
import { IChipMenuProps } from '../chip-select-menu/ChipSelectMenu';
import { forwardRef } from 'react';
import classNames from 'classnames';

interface IProps {
  children: React.ReactNode;
  item: IMenuItem;
  onClick: IChipMenuProps['onClick'];
  chips: IChipMenuProps['chips'];
  className?: string;
}

const MenuItem = forwardRef<HTMLLIElement, IProps>(
  ({ children, item, onClick, chips, className }, ref) => {
    const isItemSelected = chips.some((chip) => chip.id === item.id);

    return (
      <li
        className={classNames(classes.item, className)}
        ref={ref}
        onClick={() => onClick(item)}
      >
        <input
          type="checkbox"
          checked={isItemSelected}
          className={classes.checkbox}
        />
        {children}
      </li>
    );
  }
);

export default MenuItem;
