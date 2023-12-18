import { useState } from 'react';
import classes from './MultiSelect.module.scss';

function MultiSelect() {
  const [options, setOptions] = useState<string[]>([]);

  return (
    <div className={classes.container}>
      {options.map((option) => (
        <div className={classes.option}>{option}</div>
      ))}
      <input className={classes.input} />
    </div>
  );
}
export default MultiSelect;
