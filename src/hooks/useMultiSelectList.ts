import { KeyboardEvent, MouseEvent, useState } from 'react';
import { IChip } from '../components/chip/Chip.types';
import { IMenuItem } from '../components/menu-item/MenuItem.types';

interface IProps {
  menuItems: IMenuItem[];
}

function useMultiSelectList({ menuItems }: IProps) {
  const [chips, setChips] = useState<IChip[]>([]);
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [focusedItemIndex, setFocusedItemIndex] = useState<number>(0);
  const [focusedChipId, setFocusedChipId] = useState<string>();
  const [inputValue, setInputValue] = useState<string>('');

  const handleAdd = (item: IMenuItem) => {
    const newChip = { id: item.id, label: item.label };

    setChips((prev) => [...prev, newChip]);
  };

  const handleDelete = (id: string) => {
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

  const onArrowLeft = (e: KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (Number(target.selectionStart) >= 1) return;

    if (!focusedChipId) return setFocusedChipId(chips[chips.length - 1]?.id);

    const prevFocusIndex = chips.findIndex((chip) => chip.id === focusedChipId);

    setFocusedChipId(chips[prevFocusIndex - 1]?.id);
  };

  const onArrowRight = (e: KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (Number(target.selectionStart) <= target.value.length - 1) return;

    if (!focusedChipId) return setFocusedChipId(chips[0]?.id);

    const prevFocusIndex = chips.findIndex((chip) => chip.id === focusedChipId);

    setFocusedChipId(chips[prevFocusIndex + 1]?.id);
  };

  const onClickItem = (e: MouseEvent<HTMLLIElement>) => {
    if (focusedChipId) {
      handleDelete(focusedChipId);
      setFocusedChipId(undefined);
      e.preventDefault();
      return;
    }

    if (!isMenuExpanded) return;

    const item = menuItems[focusedItemIndex];
    if (!item) return;

    if (isItemSelected(item.id)) handleDelete(item.id);
    else handleAdd(item);

    setInputValue('');
    e.preventDefault();
  };

  const onEscape = () => {
    if (focusedChipId) return setFocusedChipId(undefined);

    if (isMenuExpanded) return setIsMenuExpanded(false);
  };

  const onBackspace = () => {
    if (!chips.length || inputValue) return;

    const chip = chips.slice(-1)[0] as IChip;

    handleDelete(chip.id);
  };

  const isItemSelected = (id: string) => {
    return chips.some((chip) => chip.id === id);
  };

  const getKeyboardActions = (): Record<string, Function> => {
    return {
      Escape: onEscape,
      Backspace: onBackspace,
      Tab: onClickItem,
      Enter: onClickItem,
      ArrowUp: onArrowUp,
      ArrowDown: onArrowDown,
      ArrowLeft: onArrowLeft,
      ArrowRight: onArrowRight,
    };
  };

  return {
    chips,
    handleAdd,
    handleDelete,
    isMenuExpanded,
    setIsMenuExpanded,
    focusedItemIndex,
    setFocusedItemIndex,
    focusedChipId,
    inputValue,
    setInputValue,
    keyboardActions: getKeyboardActions(),
  };
}
export default useMultiSelectList;
