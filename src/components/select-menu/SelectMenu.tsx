import classes from './SelectMenu.module.scss';
import { IMenuItem } from '../menu-item/MenuItem.types';
import MenuItem from '../menu-item/MenuItem';
import { IChip } from '../chip/Chip.types';
import { MouseEvent, useEffect, useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import LoadingIcon from '../common/loading-icon/LoadingIcon';

export interface IChipMenuProps {
  items: IMenuItem[];
  onClick: (e: MouseEvent<HTMLLIElement>) => void;
  isLoading?: boolean;
  style?: React.CSSProperties;
  chips: IChip[];
  focusIndex: number;
  setFocusIndex: React.Dispatch<React.SetStateAction<number>>;
  closeDialog: (e: Event) => void;
  error?: string;
}

function SelectMenu({
  style,
  items,
  isLoading,
  onClick,
  chips,
  focusIndex,
  setFocusIndex,
  closeDialog,
  error,
}: IChipMenuProps) {
  const itemsRef = useRef<HTMLLIElement[]>([]);
  const menuRef = useClickOutside<HTMLUListElement>(closeDialog);

  useEffect(() => {
    const focusedItemRef = itemsRef.current[focusIndex];

    focusedItemRef?.scrollIntoView({ block: 'nearest' });
  }, [focusIndex, items]);

  return (
    <ul style={style} className={classes.menu} ref={menuRef}>
      {error && <p className={classes.error}>{error}</p>}
      {isLoading && (
        <div className={classes.spinner}>
          <LoadingIcon />
        </div>
      )}

      {!isLoading &&
        items.map((item, idx) => (
          <MenuItem
            key={item.id}
            item={item}
            onClick={onClick}
            chips={chips}
            className={`${focusIndex === idx ? classes.focus : ''}`}
            ref={(el) => {
              if (!el) return;

              itemsRef.current[idx] = el;
            }}
            onMouseEnter={() => {
              setFocusIndex(idx);
            }}
          >
            {item.element}
          </MenuItem>
        ))}
    </ul>
  );
}
export default SelectMenu;
