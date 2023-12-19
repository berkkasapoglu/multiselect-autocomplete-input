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
    if (!isMenuExpanded) return;

    const item = menuItems[focusedItemIndex];
    if (!item) return;

    if (isItemSelected(item.id)) onDelete(item.id);
    else onAdd(item);

    setInputValue('');
    e.preventDefault();
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
  };
}
export default useMultiSelectList;
