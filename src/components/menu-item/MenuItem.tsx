import { IMenuItem } from './MenuItem.types';
import classes from './MenuItem.module.scss';
import { IChipMenuProps } from '../chip-select-menu/ChipSelectMenu';
import { forwardRef } from 'react';
import classNames from 'classnames';
import useClickOutside from '../../hooks/useClickOutside';

interface IProps {
  children: React.ReactNode;
  item: IMenuItem;
  onClick: IChipMenuProps['onClick'];
  chips: IChipMenuProps['chips'];
  className?: string;
  onMouseEnter?: () => void;
}

const MenuItem = forwardRef<HTMLLIElement, IProps>(
  ({ children, item, onClick, chips, className, onMouseEnter }, ref) => {
    const isItemSelected = chips.some((chip) => chip.id === item.id);

    return (
      <li
        onMouseEnter={onMouseEnter}
        className={classNames(classes.item, className)}
        ref={ref}
        onClick={(e) => {
          onClick(item);
          e.stopPropagation();
        }}
      >
        <input
          readOnly
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
