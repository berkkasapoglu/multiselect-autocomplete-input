import { ChangeEvent, KeyboardEvent, useState } from 'react';
import Chip from '../chip/Chip';
import classes from './MultiSelect.module.scss';

function MultiSelect() {
  const [options, setOptions] = useState<string[]>([]);
  const [value, setValue] = useState<string>('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!value) return;

      setOptions((prev) => [...prev, value]);
      setValue('');
    }

    if (e.key === 'Backspace' && !value) {
      setOptions(options.slice(0, -1));
    }
  };

  return (
    <div className={classes.container}>
      {options.map((option, idx) => (
        <Chip key={idx} name={option} />
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
