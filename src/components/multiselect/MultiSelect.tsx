import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import Chip from '../chip/Chip';
import classes from './MultiSelect.module.scss';
import { IChip } from '../chip/Chip.types';
import ChipSelectMenu from '../select-menu/SelectMenu';
import { IMenuItem } from '../menu-item/MenuItem.types';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useMultiSelectList from '../../hooks/useMultiSelectList';

const MENU_OFFSET = 10;

interface IProps {
  menuItems: IMenuItem[];
  onChange?: (value: string) => void;
  isLoading?: boolean;
}

function MultiSelect({ menuItems, onChange, isLoading }: IProps) {
  const [value, setValue] = useState<string>('');
  const [inputHeight, setInputHeight] = useState<number>();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    chips,
    onDelete,
    onClickItem,
    onArrowDown,
    onArrowUp,
    isMenuExpanded,
    setIsMenuExpanded,
    focusedItemIndex,
    setFocusedItemIndex,
    onArrowLeft,
    onArrowRight,
    onEscape,
    focusedChipId,
  } = useMultiSelectList({ menuItems, setInputValue: setValue });

  const getKeyboardActions = (): Record<string, Function> => {
    return {
      Escape: onEscape,
      Backspace: () => {
        if (!chips.length || value) return;

        const chip = chips.slice(-1)[0] as IChip;

        onDelete(chip.id);
      },
      Tab: onClickItem,
      Enter: onClickItem,
      ArrowUp: onArrowUp,
      ArrowDown: onArrowDown,
      ArrowLeft: onArrowLeft,
      ArrowRight: onArrowRight,
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
            <Chip
              key={chip.id}
              onDelete={onDelete}
              chip={chip}
              focused={chip.id === focusedChipId}
            />
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
              onClickItem(e);
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
