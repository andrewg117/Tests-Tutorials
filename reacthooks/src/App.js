import './App.css';
// import InDeCrement from './components/InDeCrement';
// import InDeCrementContext from './components/InDeCrementContext';
// import CrementUserInput from './components/CrementUserInput';
import InDeCrementReducer from './components/InDeCrementReducer';

const randNum = (min, max) => {
  let num = Math.round(Math.random() * (max - (min)) + (min));
  return num;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <InDeCrement initialValue={randNum(0, 0)} changeAmount={1} /> */}
        {/* <InDeCrementContext initialValue={0}>
          <CrementUserInput initialValue={0} changeAmount={1} />
        </InDeCrementContext> */}
        <InDeCrementReducer initialValue={randNum(0, 0)} changeAmount={1} />
      </header>
    </div>
  );
}

export default App;
