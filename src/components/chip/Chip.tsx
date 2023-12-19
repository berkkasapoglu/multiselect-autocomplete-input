import classes from './Chip.module.scss';

interface IProps {
  name: string;
  closeable?: boolean;
}

function Chip({ name, closeable = true }: IProps) {
  return <div className={classes.option}>{name}</div>;
}
export default Chip;
