import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import Chip from '../chip/Chip';
import classes from './MultiSelect.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { IChip } from '../chip/Chip.types';
import ChipSelectMenu from '../chip-select-menu/ChipSelectMenu';
import { IMenuItem } from '../menu-item/MenuItem.types';

const MENU_OFFSET = 10;

interface IProps {
  menuItems: IMenuItem[];
  onChange?: (value: string) => void;
  isLoading?: boolean;
}

function MultiSelect({ menuItems, onChange, isLoading }: IProps) {
  const [chips, setChips] = useState<IChip[]>([]);
  const [value, setValue] = useState<string>();
  const [inputHeight, setInputHeight] = useState<number>();
  const [focusedItemIndex, setFocusedItemIndex] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setInputHeight(containerRef.current?.clientHeight);
  });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setValue(inputValue);
    onChange?.(inputValue);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') onArrowDown();
    if (e.key === 'ArrowUp') onArrowUp();

    if (e.key === 'Enter' || e.key === 'Tab') {
      console.log('e.key', e.key, inputRef.current);
      const focusedItem = menuItems[focusedItemIndex];
      if (!focusedItem) return;

      onAdd(focusedItem);
    }

    if (e.key === 'Backspace' && !value) {
      const id = chips[chips.length - 1]?.id;

      if (!id) return;

      onDelete(id);
    }
  };

  const onAdd = (item: IMenuItem) => {
    const newChip = { id: item.id, label: item.label };

    setChips((prev) => [...prev, newChip]);
    setValue('');
  };

  const onDelete = (id: string) => {
    const newChips = chips.filter((chip) => chip.id !== id);

    setChips(newChips);
  };

  const onArrowUp = () => {
    const menuListLength = menuItems.length;

    setFocusedItemIndex((prev) => {
      if (prev === 0) return menuListLength - 1;

      return prev - 1;
    });
  };

  const onArrowDown = () => {
    const menuListLength = menuItems.length;

    setFocusedItemIndex((prev) => {
      if (prev === menuListLength - 1) return 0;

      return prev + 1;
    });
  };

  const onClick = (item: IMenuItem) => {
    if (isItemSelected(item.id)) return onDelete(item.id);

    onAdd(item);
  };

  const isItemSelected = (id: string) => {
    return chips.some((chip) => chip.id === id);
  };

  return (
    <>
      <div
        className={classes.container}
        ref={containerRef}
        onClick={() => inputRef.current?.focus()}
      >
        {chips.map((chip) => (
          <Chip key={chip.id} onDelete={onDelete} chip={chip} />
        ))}

        <div className={classes.inputContainer}>
          <input
            className={classes.input}
            ref={inputRef}
            onChange={onInputChange}
            value={value}
            onKeyDown={onKeyDown}
          />
        </div>

        <ChipSelectMenu
          style={{ top: inputHeight && inputHeight + MENU_OFFSET }}
          items={menuItems}
          isLoading={isLoading}
          onClick={onClick}
          chips={chips}
          focusIndex={focusedItemIndex}
        />
      </div>
    </>
  );
}
export default MultiSelect;
