import classes from './App.module.scss';
import MultiSelect from './components/multiselect/MultiSelect';

function App() {
  return (
    <div className={classes.container}>
      <MultiSelect />
    </div>
  );
}

export default App;
