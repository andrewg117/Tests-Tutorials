import './App.css';
import InDeCrement from './components/InDeCrement';

const randNum = (min, max) => {
  let num = Math.round(Math.random() * (max - (min)) + (min));
  return num;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <InDeCrement initialValue={randNum(0, 0)} changeAmount={1} />
      </header>
    </div>
  );
}

export default App;
