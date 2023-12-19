import { ChangeEvent, KeyboardEvent, useState } from 'react';
import Chip from '../chip/Chip';
import classes from './MultiSelect.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { IChip } from '../chip/Chip.types';

function MultiSelect() {
  const [chips, setChips] = useState<IChip[]>([]);
  const [value, setValue] = useState<string>('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onAdd();

    if (e.key === 'Backspace' && !value) {
      const id = chips[chips.length - 1]?.id;

      if (!id) return;

      onDelete(id);
    }
  };

  const onAdd = () => {
    if (!value) return;

    const newChip = { id: uuidv4(), label: value };

    setChips((prev) => [...prev, newChip]);
    setValue('');
  };

  const onDelete = (id: string) => {
    const newChips = chips.filter((chip) => chip.id !== id);

    setChips(newChips);
  };

  return (
    <div className={classes.container}>
      {chips.map((chip) => (
        <Chip key={chip.id} onDelete={onDelete} chip={chip} />
      ))}

      <div className={classes.inputContainer} data-value={value}>
        <input
          className={classes.input}
          onChange={onChange}
          value={value}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  );
}
export default MultiSelect;
