import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import Chip from '../chip/Chip';
import classes from './MultiSelect.module.scss';
import { IChip } from '../chip/Chip.types';
import ChipSelectMenu from '../chip-select-menu/ChipSelectMenu';
import { IMenuItem } from '../menu-item/MenuItem.types';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MENU_OFFSET = 10;

interface IProps {
  menuItems: IMenuItem[];
  onChange?: (value: string) => void;
  isLoading?: boolean;
}

function MultiSelect({ menuItems, onChange, isLoading }: IProps) {
  const [chips, setChips] = useState<IChip[]>([]);
  const [value, setValue] = useState<string>('');
  const [inputHeight, setInputHeight] = useState<number>();
  const [focusedItemIndex, setFocusedItemIndex] = useState<number>(0);
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const getKeyboardActions = (): Record<string, Function> => {
    return {
      Escape: () => setIsMenuExpanded(false),
      Backspace: () => {
        if (!chips.length || value) return;

        const chip = chips.slice(-1)[0] as IChip;

        onDelete(chip.id);
      },
      Tab: onClick,
      Enter: onClick,
      ArrowUp: onArrowUp,
      ArrowDown: onArrowDown,
    };
  };

  useEffect(() => {
    setInputHeight(containerRef.current?.clientHeight);
  });

  useEffect(() => {
    onChange?.(value);
    setFocusedItemIndex(0);
  }, [value, onChange]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setValue(inputValue);

    setIsMenuExpanded(true);
  };

  const onAdd = (item: IMenuItem) => {
    const newChip = { id: item.id, label: item.label };

    setChips((prev) => [...prev, newChip]);
  };

  const onDelete = (id: string) => {
    const newChips = chips.filter((chip) => chip.id !== id);

    setChips(newChips);
  };

  const onArrowUp = (e: KeyboardEvent<HTMLInputElement>) => {
    const menuListLength = menuItems.length;

    setFocusedItemIndex((prev) => {
      if (prev === 0) return menuListLength - 1;

      return prev - 1;
    });

    if (!isMenuExpanded) setIsMenuExpanded(true);

    e.preventDefault();
  };

  const onArrowDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const menuListLength = menuItems.length;

    setFocusedItemIndex((prev) => {
      if (prev === menuListLength - 1) return 0;

      return prev + 1;
    });

    if (!isMenuExpanded) setIsMenuExpanded(true);

    e.preventDefault();
  };

  const onClick = (e: MouseEvent<HTMLLIElement>) => {
    if (!isMenuExpanded) return;

    const item = menuItems[focusedItemIndex];
    if (!item) return;

    if (isItemSelected(item.id)) onDelete(item.id);
    else onAdd(item);

    setValue('');

    e.preventDefault();
  };

  const isItemSelected = (id: string) => {
    return chips.some((chip) => chip.id === id);
  };

  return (
    <>
      <div
        className={classes.container}
        ref={containerRef}
        onClick={() => {
          setIsMenuExpanded((prev) => !prev);
          inputRef.current?.focus();
        }}
      >
        <div className={classes.list}>
          {chips.map((chip) => (
            <Chip key={chip.id} onDelete={onDelete} chip={chip} />
          ))}

          <div className={classes.inputContainer}>
            <input
              className={classes.input}
              ref={inputRef}
              onChange={onInputChange}
              value={value}
              onKeyDown={(e) => {
                const action = getKeyboardActions()[e.key];
                action?.(e);
              }}
            />
          </div>
        </div>

        <FontAwesomeIcon icon={faCaretDown} className={classes.arrowDown} />

        {isMenuExpanded && (
          <ChipSelectMenu
            style={{ top: inputHeight && inputHeight + MENU_OFFSET }}
            items={menuItems}
            isLoading={isLoading}
            onClick={(e) => {
              onClick(e);
              inputRef.current?.focus();
            }}
            chips={chips}
            focusIndex={focusedItemIndex}
            setFocusIndex={setFocusedItemIndex}
            closeDialog={(e) => {
              if (containerRef.current?.contains(e.target as Node)) return;

              setIsMenuExpanded(false);
            }}
          />
        )}
      </div>
    </>
  );
}
export default MultiSelect;
