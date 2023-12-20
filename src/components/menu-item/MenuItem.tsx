import { IMenuItem } from './MenuItem.types';
import classes from './MenuItem.module.scss';
import { forwardRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import { IChipMenuProps } from '../select-menu/SelectMenu';

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
    const [isItemChecked, setIsItemChecked] = useState(false);

    useEffect(() => {
      const isChecked = chips.some((chip) => chip.id === item.id);
      setIsItemChecked(isChecked);
    }, [chips]);

    return (
      <li
        onMouseEnter={onMouseEnter}
        className={classNames(classes.item, className)}
        ref={ref}
        onClick={(e) => {
          onClick(e);
          console.log('on click list');
          e.stopPropagation();
        }}
      >
        <input
          readOnly
          type="checkbox"
          checked={isItemChecked}
          className={classes.checkbox}
          onClick={() => console.log('on click checkbox')}
        />
        {children}
      </li>
    );
  }
);

export default MenuItem;
