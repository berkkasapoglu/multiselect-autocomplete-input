import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './LoadingIcon.module.scss';

function LoadingIcon() {
  return <FontAwesomeIcon icon={faSpinner} className={classes.spinner} />;
}
export default LoadingIcon;
