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
  const inputRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setInputHeight(inputRef.current?.clientHeight);
  });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setValue(inputValue);
    onChange?.(inputValue);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // if (e.key === 'Enter') onAdd();
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

  const onClick = (item: IMenuItem) => {
    if (isItemSelected(item.id)) return onDelete(item.id);

    onAdd(item);
  };

  const isItemSelected = (id: string) => {
    return chips.some((chip) => chip.id === id);
  };

  return (
    <>
      <div className={classes.container} ref={inputRef}>
        {chips.map((chip) => (
          <Chip key={chip.id} onDelete={onDelete} chip={chip} />
        ))}

        <div className={classes.inputContainer}>
          <input
            className={classes.input}
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
        />
      </div>
    </>
  );
}
export default MultiSelect;
