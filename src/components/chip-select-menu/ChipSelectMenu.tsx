import classes from './ChipSelectMenu.module.scss';
import { IMenuItem } from '../menu-item/MenuItem.types';
import MenuItem from '../menu-item/MenuItem';
import { IChip } from '../chip/Chip.types';
import { useEffect, useRef } from 'react';
import classNames from 'classnames';

export interface IChipMenuProps {
  items: IMenuItem[];
  onClick: (item: IMenuItem) => void;
  isLoading?: boolean;
  style?: React.CSSProperties;
  chips: IChip[];
  focusIndex: number;
}

function ChipSelectMenu({
  style,
  items,
  isLoading,
  onClick,
  chips,
  focusIndex,
}: IChipMenuProps) {
  const itemsRef = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    const focusedItemRef = itemsRef.current[focusIndex];

    focusedItemRef?.scrollIntoView({ block: 'nearest' });
  }, [focusIndex, items]);

  return (
    <ul style={style} className={classes.menu}>
      {isLoading && <p>Loading...</p>}

      {!isLoading &&
        items.map((item, idx) => (
          <MenuItem
            item={item}
            onClick={onClick}
            chips={chips}
            className={`${focusIndex === idx ? classes.focus : ''}`}
            ref={(el) => {
              if (!el) return;

              itemsRef.current[idx] = el;
            }}
          >
            {item.element}
          </MenuItem>
        ))}
    </ul>
  );
}
export default ChipSelectMenu;
