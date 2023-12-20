import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Chip from '../chip/Chip';
import classes from './MultiSelect.module.scss';
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
  error?: string;
}

function MultiSelect({ menuItems, onChange, isLoading, error }: IProps) {
  const [inputHeight, setInputHeight] = useState<number>();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    chips,
    handleDelete,
    isMenuExpanded,
    setIsMenuExpanded,
    focusedItemIndex,
    setFocusedItemIndex,
    focusedChipId,
    inputValue,
    setInputValue,
    keyboardActions,
  } = useMultiSelectList({ menuItems });

  useEffect(() => {
    setInputHeight(containerRef.current?.clientHeight);
  });

  useEffect(() => {
    onChange?.(inputValue);
    setFocusedItemIndex(0);
  }, [inputValue, onChange]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    setInputValue(inputValue);

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
              onDelete={handleDelete}
              chip={chip}
              focused={chip.id === focusedChipId}
            />
          ))}

          <div className={classes.inputContainer}>
            <input
              className={classes.input}
              ref={inputRef}
              onChange={onInputChange}
              value={inputValue}
              onKeyDown={(e) => {
                const action = keyboardActions[e.key];
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
              keyboardActions['Enter']?.(e);
              inputRef.current?.focus();
            }}
            chips={chips}
            focusIndex={focusedItemIndex}
            setFocusIndex={setFocusedItemIndex}
            closeDialog={(e) => {
              if (containerRef.current?.contains(e.target as Node)) return;

              setIsMenuExpanded(false);
            }}
            error={error}
          />
        )}
      </div>
    </>
  );
}
export default MultiSelect;
