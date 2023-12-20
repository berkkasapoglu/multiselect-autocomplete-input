import { cloneDeep } from 'lodash';
import { KeyboardEvent, MouseEvent, useState } from 'react';
import { IChip } from '../components/chip/Chip.types';
import { IMenuItem } from '../components/menu-item/MenuItem.types';

function useMultiSelectList({
  menuItems,
  setInputValue,
}: {
  menuItems: IMenuItem[];
  setInputValue: (value: string) => void;
}) {
  const [chips, setChips] = useState<IChip[]>([]);
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [focusedItemIndex, setFocusedItemIndex] = useState<number>(0);
  const [focusedChipId, setFocusedChipId] = useState<string>();

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

  const onClickItem = (e: MouseEvent<HTMLLIElement>) => {
    if (focusedChipId) {
      onDelete(focusedChipId);
      setFocusedChipId(undefined);
      e.preventDefault();
      return;
    }

    if (!isMenuExpanded) return;

    const item = menuItems[focusedItemIndex];
    if (!item) return;

    if (isItemSelected(item.id)) onDelete(item.id);
    else onAdd(item);

    setInputValue('');
    e.preventDefault();
  };

  const onArrowLeft = () => {
    if (!focusedChipId) return setFocusedChipId(chips[chips.length - 1]?.id);

    const prevFocusIndex = chips.findIndex((chip) => chip.id === focusedChipId);

    setFocusedChipId(chips[prevFocusIndex - 1]?.id);
  };

  const onArrowRight = () => {
    if (!focusedChipId) return setFocusedChipId(chips[0]?.id);

    const prevFocusIndex = chips.findIndex((chip) => chip.id === focusedChipId);

    setFocusedChipId(chips[prevFocusIndex + 1]?.id);
  };

  const onEscape = () => {
    if (focusedChipId) return setFocusedChipId(undefined);

    if (isMenuExpanded) return setIsMenuExpanded(false);
  };

  const isItemSelected = (id: string) => {
    return chips.some((chip) => chip.id === id);
  };

  return {
    onAdd,
    onDelete,
    onClickItem,
    onArrowDown,
    onArrowUp,
    isItemSelected,
    chips,
    isMenuExpanded,
    setIsMenuExpanded,
    focusedItemIndex,
    setFocusedItemIndex,
    onArrowLeft,
    onEscape,
    focusedChipId,
    onArrowRight,
  };
}
export default useMultiSelectList;
