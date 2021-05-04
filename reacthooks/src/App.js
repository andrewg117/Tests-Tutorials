import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

const InDeCrement = () => {
  const [value, changeValue] = useState(0);

  const increment = () => {
    changeValue(value + 1);
  }

  const decrement = () => {
    changeValue(value - 1);
  }

  const reset = () => {
    changeValue(0);
  }

  return (
    <>
      <h1>{value}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <InDeCrement />
      </header>
    </div>
  );
}

export default App;
